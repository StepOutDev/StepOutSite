package gateways

import (
	"stepoutsite/src/middlewares"

	"github.com/gofiber/fiber/v2"
)

func GatewayUser(gateway HTTPGateway, app *fiber.App) {
	api := app.Group("/api/v1/user")

	apiNoJWT := api.Group("")
	apiNoJWT.Post("/register", gateway.CreateUser)
	apiNoJWT.Post("/login", gateway.Login)

	apiJWT := api.Group("")
	apiJWT.Use(middlewares.SetJWtHeaderHandler())
	apiJWT.Post("/get_users", gateway.GetAllUsers)
	apiJWT.Get("/me", gateway.GetMe)
	apiJWT.Post("/logout", gateway.Logout)
	apiJWT.Put("/update", gateway.UpdateUser)
	apiJWT.Delete("/delete", gateway.DeleteUser)
}

func GatewayKneepads(gateway HTTPGateway, app *fiber.App){
	api := app.Group("/api/v1/kneepads")

	apiJWT := api.Group("")
	apiJWT.Use(middlewares.SetJWtHeaderHandler())
	apiJWT.Post("/create",gateway.CreateKneepads)
	apiJWT.Get("/get_one",gateway.GetOneKneepads)
}
