package services

import (
	"errors"
	"stepoutsite/domain/entities"
	"stepoutsite/domain/repositories"
)

type kneepadsService struct{
	KneepadsRepository repositories.IKneepadsRepository
	UserService IUserService
}

type IKneepadsService interface {
	CreateKneepads(studentID string,kneepads entities.KneepadsDataFormat) error
}

func NewKneepadsService(kneepadsRepository repositories.IKneepadsRepository,userService IUserService) IKneepadsService {
	return &kneepadsService{
		KneepadsRepository: kneepadsRepository,
		UserService: userService,
	}
}

func(sv kneepadsService) CreateKneepads(studentID string,kneepads entities.KneepadsDataFormat) error{
	if kneepads.Number == "" || kneepads.Size == "" || kneepads.Status == "" {
		return errors.New("please complete the data")
	}

	if err := sv.UserService.CheckPermissionCoreAndAdmin(studentID); err!=nil{
		return errors.New("unauthorized")
	}

	if err := sv.KneepadsRepository.CreateKneepads(kneepads); err!=nil{
		return err
	}

	return nil
}