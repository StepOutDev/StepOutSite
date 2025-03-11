package gateways

import (
	"stepoutsite/domain/entities"
	"stepoutsite/src/middlewares"

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
	var event entities.EventDataFormat
	if err := ctx.BodyParser(&event); err!=nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}
	err = h.eventService.CreateEvent(event,token.StudentID)
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
	eventID := params["event_name"]
	var event entities.EventDataFormat
	if err := ctx.BodyParser(&event); err!=nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}
	err = h.eventService.UpdateEvent(eventID,event,token.StudentID)
	if err!=nil{
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}
	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "successfully update event"})
}