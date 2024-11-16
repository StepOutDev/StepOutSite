package gateways

import (
	"stepoutsite/backend/src/services"

	"github.com/gofiber/fiber/v2"
)

type HTTPGateway struct {
	userService services.IUserService
}

func NewHTTPGateway(app *fiber.App, userService services.IUserService) {
	gateway := &HTTPGateway{
		userService: userService,
	}

	GatewayUser(*gateway,app)
}