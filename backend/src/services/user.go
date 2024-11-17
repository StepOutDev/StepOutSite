package services

import (
	// "errors"
	// "fmt"
	"errors"
	"stepoutsite/domain/entities"
	"stepoutsite/domain/repositories"

	"go.mongodb.org/mongo-driver/bson"
)

type userService struct {
	UserRepository repositories.IUserRepository
}

type IUserService interface {
	GetAllUsers(filter bson.M) (*[]entities.UserDataFormat, error)
	CreateUser(user entities.UserDataFormat) error
}

func NewUserService(userRepository repositories.IUserRepository) IUserService {
	return &userService{
		UserRepository: userRepository,
	}
}

func (sv userService) CreateUser(user entities.UserDataFormat) error {
	if user.StudentID == ""{
		return errors.New("please fill in student id")
	}

	err := sv.UserRepository.CreateUser(user)

	if err != nil {
		return err
	}

	return nil
}

func (sv userService) GetAllUsers(filter bson.M) (*[]entities.UserDataFormat, error){	
	users,err := sv.UserRepository.GetAllUsers(filter)

	if err != nil {
		return nil,err
	}

	return users,nil
}