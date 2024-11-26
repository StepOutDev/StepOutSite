package gateways

import (
	"stepoutsite/domain/entities"
	"stepoutsite/src/middlewares"

	"github.com/gofiber/fiber/v2"
)

func (h *HTTPGateway) CreateKneepads(ctx *fiber.Ctx) error{
	token,err := middlewares.DecodeJWTToken(ctx)
	if err!=nil || token==nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "Unauthorization Token."})
	}
	var kneepads entities.KneepadsDataFormat
	if err := ctx.BodyParser(&kneepads); err!=nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}
	err = h.kneepadsService.CreateKneepads(token.StudentID,kneepads)
	if err!=nil{
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}
	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "successfully create kneepads"})
}

func (h *HTTPGateway) GetOneKneepads(ctx *fiber.Ctx) error{
	token,err := middlewares.DecodeJWTToken(ctx)
	if err!=nil || token==nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "Unauthorization Token."})
	}
	params := ctx.Queries()
	number := params["number"]
	kneepads,err := h.kneepadsService.GetOneKneepads(token.StudentID,number)
	if err!=nil{
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}
	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "successfully get kneepads",Data: kneepads})
}