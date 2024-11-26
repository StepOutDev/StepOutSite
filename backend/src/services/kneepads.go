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
	GetOneKneepads(studentID string,number string) (entities.KneepadsDataFormat,error)
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

	if _,err := sv.KneepadsRepository.GetOneKneepads(kneepads.Number); err == nil {
		return errors.New("kneepads already exists")
	}

	if err := sv.UserService.CheckPermissionCoreAndAdmin(studentID); err!=nil{
		return errors.New("unauthorized")
	}

	if err := sv.KneepadsRepository.CreateKneepads(kneepads); err!=nil{
		return err
	}

	return nil
}

func(sv kneepadsService) GetOneKneepads(studentID string,number string) (entities.KneepadsDataFormat,error){
	if number == "" {
		return entities.KneepadsDataFormat{},errors.New("please provide number")
	}

	if err := sv.UserService.CheckPermissionMember(studentID); err!=nil{
		return entities.KneepadsDataFormat{},errors.New("unauthorized")
	}

	kneepads,err := sv.KneepadsRepository.GetOneKneepads(number);
	if err!=nil	{
		return entities.KneepadsDataFormat{},err
	}

	return kneepads,nil
}