package services

import (
	// "errors"
	// "fmt"
	// "stepoutsite/backend/domain/entities"
	"stepoutsite/backend/domain/repositories"

)

type userService struct {
	UserRepository repositories.IUserRepository
}

type IUserService interface {
	
}

func NewUserService(userRepository repositories.IUserRepository) IUserService {
	return &userService{
		UserRepository: userRepository,
	}
}

