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

func (h *HTTPGateway) GetAllKneepads(ctx *fiber.Ctx) error{
	token,err := middlewares.DecodeJWTToken(ctx)
	if err!=nil || token==nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "Unauthorization Token."})
	}
	kneepads,err := h.kneepadsService.GetAllKneepads(token.StudentID)
	if err!=nil{
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}
	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "successfully get all kneepads",Data: kneepads})
}

func (h *HTTPGateway) UpdateKneepads(ctx *fiber.Ctx) error{
	token,err := middlewares.DecodeJWTToken(ctx)
	if err!=nil || token==nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "Unauthorization Token."})
	}
	params := ctx.Queries()
	number := params["number"]
	var kneepads entities.KneepadsDataFormat
	if err := ctx.BodyParser(&kneepads); err!=nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}
	err = h.kneepadsService.UpdateKneepads(token.StudentID,number,kneepads)
	if err!=nil{
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}
	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "successfully update kneepads"})
}

func (h *HTTPGateway) DeleteKneepads(ctx *fiber.Ctx) error{
	token,err := middlewares.DecodeJWTToken(ctx)
	if err!=nil || token==nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "Unauthorization Token."})
	}
	params := ctx.Queries()
	number := params["number"]
	err = h.kneepadsService.DeleteKneepads(token.StudentID,number)
	if err!=nil{
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}
	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "successfully delete kneepads"})
}

func (h *HTTPGateway) PendingKneepads(ctx *fiber.Ctx) error{
	token,err := middlewares.DecodeJWTToken(ctx)
	if err!=nil || token==nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "Unauthorization Token."})
	}
	params := ctx.Queries()
	number := params["number"]
	var kneepads entities.KneepadsDataFormat
	if err := ctx.BodyParser(&kneepads); err!=nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}
	err = h.kneepadsService.PendingKneepads(token.StudentID,number, kneepads)
	if err!=nil{
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}
	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "successfully pending kneepads"})
}

func (h *HTTPGateway) ReturnKneepads(ctx *fiber.Ctx) error{
	token,err := middlewares.DecodeJWTToken(ctx)
	if err!=nil || token==nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "Unauthorization Token."})
	}
	params := ctx.Queries()
	number := params["number"]
	var kneepads entities.KneepadsDataFormat
	if err := ctx.BodyParser(&kneepads); err!=nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}
	err = h.kneepadsService.ReturnKneepads(token.StudentID,number, kneepads)
	if err!=nil{
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}
	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "successfully pending kneepads"})	
}