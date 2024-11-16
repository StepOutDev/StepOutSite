package gateways

import (
	// "fmt"
	"stepoutsite/domain/entities"
	// "stepoutsite/src/middlewares"

	"github.com/gofiber/fiber/v2"
)

func (h *HTTPGateway) CreateUser(ctx *fiber.Ctx) error {
	user := entities.UserDataFormat{}

	if err := ctx.BodyParser(&user); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}

	if err := h.userService.CreateUser(user); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}

	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "successfully create user"})
}