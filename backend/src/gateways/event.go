package gateways

import (
	"fmt"
	"io/ioutil"
	"stepoutsite/domain/entities"
	"stepoutsite/src/middlewares"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func (h *HTTPGateway) GetAllEvents(ctx *fiber.Ctx) error {
	events, err := h.eventService.GetAllEvents();

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}

	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "successfully get all events", Data: events})

}

func (h *HTTPGateway) CreateEvent(ctx *fiber.Ctx) error {
	token,err := middlewares.DecodeJWTToken(ctx)
	if err!=nil || token==nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "Unauthorization Token."})
	}

	eventName := ctx.FormValue("event_name")
	day := ctx.FormValue("day")
	description := ctx.FormValue("description")
	time := ctx.FormValue("time")
	place := ctx.FormValue("place")
	imagefile, err := ctx.FormFile("image")

	var songList []string
	for i:=0;true;i++ {
		key := fmt.Sprintf("song[%s]",strconv.Itoa(i))
		song := ctx.FormValue(key)
		if song == ""{
			break
		} else {
			songList = append(songList, song)
		}
	}
	
	var imageByte []byte
	if imagefile != nil {
		if err != nil {
			return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
		}
		image, err := imagefile.Open()
		if err != nil {
			return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
		}
		defer image.Close()
		imageByte, err = ioutil.ReadAll(image)
		if err != nil {
			return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
		}
	} else {
		imageByte = nil
	}

	var event = entities.EventDataFormat{
		EventName: eventName, 
		Day: day, 
		Description: description, 
		Song: songList,
		Time: time,
		Place: place,
	}
	// if err := ctx.BodyParser(&event); err!=nil {
	// 	return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	// }
	err = h.eventService.CreateEvent(event,token.StudentID,imageByte)
	if err!=nil{
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}
	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "successfully create event"})
}

func (h *HTTPGateway) DeleteEvent(ctx *fiber.Ctx) error {
	token,err := middlewares.DecodeJWTToken(ctx)
	if err!=nil || token==nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "Unauthorization Token."})
	}
	params := ctx.Queries();
	eventID := params["event_name"]

	err = h.eventService.DeleteEvent(eventID,token.StudentID)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}
	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseMessage{Message: "successfully delete event"})
}

func (h *HTTPGateway) UpdateEvent(ctx *fiber.Ctx) error{
	token,err := middlewares.DecodeJWTToken(ctx)
	if err!=nil || token==nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "Unauthorization Token."})
	}
	params := ctx.Queries()
	eventParam := params["event_name_param"]

	eventName := ctx.FormValue("event_name")
	day := ctx.FormValue("day")
	description := ctx.FormValue("description")
	time := ctx.FormValue("time")
	place := ctx.FormValue("place")
	imagefile, err := ctx.FormFile("image")

	var songList []string
	for i:=0;true;i++ {
		key := fmt.Sprintf("song[%s]",strconv.Itoa(i))
		song := ctx.FormValue(key)
		if song == ""{
			break
		} else {
			songList = append(songList, song)
		}
	}
	
	var imageByte []byte
	if imagefile != nil {
		if err != nil {
			return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
		}
		image, err := imagefile.Open()
		if err != nil {
			return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
		}
		defer image.Close()
		imageByte, err = ioutil.ReadAll(image)
		if err != nil {
			return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
		}
	} else {
		imageByte = nil
	}

	var event = entities.EventDataFormat{
		EventName: eventName, 
		Day: day, 
		Description: description, 
		Song: songList,
		Time: time,
		Place: place,
	}

	// if err := ctx.BodyParser(&event); err!=nil {
	// 	return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	// }
	err = h.eventService.UpdateEvent(eventParam,event,token.StudentID,imageByte)
	if err!=nil{
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}
	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "successfully update event"})
}