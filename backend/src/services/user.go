package services

import (
	// "errors"
	// "fmt"
	"errors"
	"stepoutsite/domain/entities"
	"stepoutsite/domain/repositories"
)

type userService struct {
	UserRepository repositories.IUserRepository
}

type IUserService interface {
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
