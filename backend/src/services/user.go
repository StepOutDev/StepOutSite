package services

import (
	"errors"

	"stepoutsite/domain/entities"
	"stepoutsite/domain/repositories"
	"stepoutsite/src/utils"

	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

type userService struct {
	UserRepository repositories.IUserRepository
}

type IUserService interface {
	GetAllUsers(filter bson.M , studentID string) (*[]entities.UserResponseFormat, error)
	CreateUser(user entities.UserDataFormat,imageByte []byte) error
	GetOneUser(studentID string) (entities.UserDataFormat, error)
	Login(req *entities.UserDataFormat) (string,error)
	CheckPermissionCoreAndAdmin(studentID string) error
	UpdateUser(userID string,targetID string,user entities.UserDataFormat) error
	DeleteUser(userID string,targetID string) error
	GetMe(studentID string) (entities.UserResponseFormat, error)
}

func NewUserService(userRepository repositories.IUserRepository) IUserService {
	return &userService{
		UserRepository: userRepository,
	}
}

func (sv userService) CreateUser(user entities.UserDataFormat, imageByte []byte) error {
	if user.StudentID == ""{
		return errors.New("please fill in student id")
	}

	check,err := sv.UserRepository.GetOneUser(user.StudentID)
	if err == nil && check != (entities.UserDataFormat{}) {
		return errors.New("user already exist")
	}

	if imageByte != nil {
		keyName, contentType := utils.CreateKeyNameBannerImage(user.StudentID, "webp", "")

		imageURL, err := utils.UploadS3FromString(imageByte, keyName, contentType)

		if err != nil {
			return err
		}
		user.Image = imageURL
	}

	err = sv.UserRepository.CreateUser(user)

	if err != nil {
		return err
	}

	return nil
}

func (sv userService) GetAllUsers(filter bson.M, studentID string) (*[]entities.UserResponseFormat, error){	
	err := sv.CheckPermissionCoreAndAdmin(studentID)
	if err != nil {
		return nil,err
	}

	users,err := sv.UserRepository.GetAllUsers(filter)

	if err != nil {
		return nil,err
	}

	return users,nil
}

func checkPasswords(hashedPwd string, plainPwd string) error {
    byteHash := []byte(hashedPwd)
	pwd := []byte(plainPwd)
    err := bcrypt.CompareHashAndPassword(byteHash, pwd)
    if err != nil {
        return errors.New("passwords do not match")
    }
    
    return nil
}

func (sv userService) GetOneUser(studentID string) (entities.UserDataFormat, error) {
	user,err := sv.UserRepository.GetOneUser(studentID)
	
	if err != nil {
		return entities.UserDataFormat{},err
	}

	return user,nil
}

func (sv userService) Login(req *entities.UserDataFormat) (string,error) {
	user,err := sv.UserRepository.GetOneUser(req.StudentID)

	if err != nil {
		return "",errors.New("user not found")
	}

	if err := checkPasswords(user.Password, req.Password); err != nil {
		return "", errors.New("passwords do not match")
	}

	return sv.UserRepository.Login(req)
}

func (sv userService) CheckPermissionCoreAndAdmin(studentID string) error {
	admin, err := sv.UserRepository.GetOneUser(studentID)
	if err != nil {
		return errors.New("user not found")
	}
	if !(admin.Role == "core" || admin.Role == "admin") {
		return errors.New("unauthorized")
	}
	return nil
}
func (sv userService) CheckPermissionAdmin(studentID string) error {
	admin, err := sv.UserRepository.GetOneUser(studentID)
	if err != nil {
		return errors.New("user not found")
	}
	if !(admin.Role == "admin") {
		return errors.New("unauthorized")
	}
	return nil
}

func (sv userService) UpdateUser(userID string,targetID string,user entities.UserDataFormat) error {
	check,err := sv.UserRepository.GetOneUser(targetID)

	if err != nil && check == (entities.UserDataFormat{}) {
		return errors.New("user not found")
	}

	err = sv.CheckPermissionCoreAndAdmin(userID)
	if err != nil {
		targetID = userID
	}
	err = sv.CheckPermissionAdmin(userID)
	if err != nil {
		user.Role = check.Role
	}

	if err := sv.UserRepository.UpdateUser(targetID,user); err != nil {
		return err
	}

	return nil
}

func (sv userService) DeleteUser(userID string,targetID string) error {
	err := sv.CheckPermissionCoreAndAdmin(userID)
	if err != nil {
		targetID = userID
	}
	if err := sv.UserRepository.DeleteUser(targetID); err != nil {
		return err
	}

	return nil
}

func (sv userService) GetMe(studentID string) (entities.UserResponseFormat, error) {
	user,err := sv.UserRepository.GetMe(studentID)
	if err != nil {
		return entities.UserResponseFormat{},err
	}
	return user,nil
}