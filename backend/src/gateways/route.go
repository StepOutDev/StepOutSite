package gateways

import "github.com/gofiber/fiber/v2"

func GatewayUser(gateway HTTPGateway, app *fiber.App) {
	apiUser := app.Group("/api/v1/user")

	apiUser.Post("/register", gateway.CreateUser)
}
