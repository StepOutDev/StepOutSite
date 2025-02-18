package gateways

import (
	"stepoutsite/src/services"

	"github.com/gofiber/fiber/v2"
)

type HTTPGateway struct {
	userService services.IUserService
	kneepadsService services.IKneepadsService
}

func NewHTTPGateway(app *fiber.App, userService services.IUserService, kneepadsService services.IKneepadsService) {
	gateway := &HTTPGateway{
		userService: userService,
		kneepadsService: kneepadsService,
	}

	GatewayUser(*gateway,app)
	GatewayKneepads(*gateway,app)
}