package services

import (
	"errors"
	"stepoutsite/domain/entities"
	"stepoutsite/domain/repositories"
)

type eventService struct {
	EventRepository repositories.IEventRepository
	UserService IUserService
}

type IEventService interface {
	CreateEvent(event entities.EventDataFormat, studentID string) error
	GetAllEvents() (*[]entities.EventDataFormat, error)
	UpdateEvent(eventName string, event entities.EventDataFormat, studentID string) error
	DeleteEvent(eventName string, studentID string) error
}

func NewEventService(eventRepository repositories.IEventRepository, userService IUserService) IEventService {
	return &eventService{
		EventRepository: eventRepository,
		UserService: userService,
	}
}

func (sv eventService) CreateEvent(event entities.EventDataFormat, studentID string) error {
	if event.EventName == ""{
		return errors.New("Please fill in event name")
	}

	if _ ,err := sv.EventRepository.GetOneEvent(event.EventName); err == nil{
		return errors.New("event already exists")
	}

	
	if err := sv.UserService.CheckPermissionCoreAndAdmin(studentID); err != nil {
		return errors.New("unauthorized")
	}

	err := sv.EventRepository.CreateEvent(event)

	if err != nil {
		return err
	}

	return nil
}

func (sv eventService) GetAllEvents() (*[]entities.EventDataFormat, error) {
	result, err := sv.EventRepository.GetAllEvents()
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (sv eventService) UpdateEvent(eventName string, event entities.EventDataFormat, studentID string) error {
	if eventName == ""{
		return errors.New("please fill in event name")
	}

	if _,err := sv.EventRepository.GetOneEvent(eventName); err!=nil{
		return errors.New("event not found")
	}
	
	if err:= sv.UserService.CheckPermissionCoreAndAdmin(studentID); err != nil {
		return errors.New("unauthorized")
	}

	err := sv.EventRepository.UpdateEvent(eventName, event)
	if err != nil {
		return err
	}

	return nil
}

func (sv eventService) DeleteEvent(eventName string, studentID string) error {
	if err:= sv.UserService.CheckPermissionCoreAndAdmin(studentID); err != nil {
		return errors.New("unauthorized")
	}

	err := sv.EventRepository.DeleteEvent(eventName)
	if err != nil {
		return err
	}

	return nil
}