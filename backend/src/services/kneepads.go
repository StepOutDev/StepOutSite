package services

import (
	"errors"
	"stepoutsite/domain/entities"
	"stepoutsite/domain/repositories"
	"strings"
)

type kneepadsService struct{
	KneepadsRepository repositories.IKneepadsRepository
	UserService IUserService
}

type IKneepadsService interface {
	CreateKneepads(studentID string,kneepads entities.KneepadsDataFormat) error
	GetOneKneepads(studentID string,number string) (entities.KneepadsDataFormat,error)
	GetAllKneepads(studentID string) (*[]entities.KneepadsDataFormat,error)
	UpdateKneepads(studentID string,number string,kneepads entities.KneepadsDataFormat) error
	DeleteKneepads(studentID string,number string) error
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

	kneepads.Size = strings.ToUpper(kneepads.Size)

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

func(sv kneepadsService) GetAllKneepads(studentID string) (*[]entities.KneepadsDataFormat,error){
	if err := sv.UserService.CheckPermissionMember(studentID); err!=nil{
		return nil,errors.New("unauthorized")
	}

	kneepads,err := sv.KneepadsRepository.GetAllKneepads(nil);
	if err!=nil	{
		return nil,err
	}

	return kneepads,nil
}

func(sv kneepadsService) UpdateKneepads(studentID string,number string,kneepads entities.KneepadsDataFormat) error{
	if number == "" {
		return errors.New("please provide number")
	}

	if err := sv.UserService.CheckPermissionCoreAndAdmin(studentID); err!=nil{
		return errors.New("unauthorized")
	}

	_, err := sv.KneepadsRepository.GetOneKneepads(number)
	if err!=nil	{
		return errors.New("kneepads not found")
	}
	
	if err := sv.KneepadsRepository.UpdateKneepads(number,kneepads); err!=nil{
		return err
	}

	return nil
}

func(sv kneepadsService) DeleteKneepads(studentID string,number string) error{
	if number == "" {
		return errors.New("please provide number")
	}

	if err := sv.UserService.CheckPermissionCoreAndAdmin(studentID); err!=nil{
		return errors.New("unauthorized")
	}

	if err := sv.KneepadsRepository.DeleteKneepads(number); err!=nil{
		return err
	}
	return nil
}