package gateways

import (
	// "fmt"
	"stepoutsite/domain/entities"
	// "stepoutsite/src/middlewares"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
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

func (h *HTTPGateway) GetAllUsers(ctx *fiber.Ctx) error {
	filter := bson.M{}

	if err := ctx.BodyParser(&filter); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}

	users, err := h.userService.GetAllUsers(filter)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}

	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "successfully get all users", Data: users})

}