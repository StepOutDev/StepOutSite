package gateways

import (
	"fmt"
	"stepoutsite/domain/entities"
	"stepoutsite/src/middlewares"
	"time"

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
	token,err := middlewares.DecodeJWTToken(ctx)
	if err != nil || token == nil {
		fmt.Println(err)
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "Unauthorization Token."})
	}

	filter := bson.M{}

	if err := ctx.BodyParser(&filter); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}

	users, err := h.userService.GetAllUsers(filter,token.StudentID)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}

	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "successfully get all users", Data: users})

}

func (h *HTTPGateway) GetMe(ctx *fiber.Ctx) error {
	token,err := middlewares.DecodeJWTToken(ctx)
	if err != nil || token == nil {
		fmt.Println(err)
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "Unauthorization Token."})
	}
	user, err := h.userService.GetOneUser(token.StudentID)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}

	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "successfully get user", Data: user})
}

func (h *HTTPGateway) Login(ctx *fiber.Ctx) error {
	user := entities.UserDataFormat{}

	if err := ctx.BodyParser(&user); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}

	token, err := h.userService.Login(&user)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}

	cookie := fiber.Cookie{
		Name: "jwt", 
		Value: token, 
		Expires: time.Now().Add(time.Hour * 6),
		HTTPOnly: true,
	}
	ctx.Cookie(&cookie)

	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "successfully login", Data: token})
}

func (h *HTTPGateway) Logout(ctx *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name: "jwt", 
		Value: "", 
		Expires: time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}
	ctx.Cookie(&cookie)
	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "successfully logout"})
}