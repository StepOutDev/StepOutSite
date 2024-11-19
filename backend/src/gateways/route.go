package gateways

import (
	"stepoutsite/src/middlewares"

	"github.com/gofiber/fiber/v2"
)

func GatewayUser(gateway HTTPGateway, app *fiber.App) {
	apiUser := app.Group("/api/v1/user")

	apiUserNoJWT := apiUser.Group("")
	apiUserNoJWT.Post("/register", gateway.CreateUser)
	apiUserNoJWT.Post("/login", gateway.Login)

	apiUserJWT := apiUser.Group("")
	apiUserJWT.Use(middlewares.SetJWtHeaderHandler())
	apiUserJWT.Get("/users", gateway.GetAllUsers)
	apiUserJWT.Get("/me", gateway.GetMe)
	apiUserJWT.Post("/logout", gateway.Logout)
	apiUserJWT.Put("/update", gateway.UpdateUser)
	apiUserJWT.Delete("/delete", gateway.DeleteUser)
}
