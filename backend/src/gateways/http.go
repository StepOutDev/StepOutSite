package gateways

import (
	"stepoutsite/src/services"

	"github.com/gofiber/fiber/v2"
)

type HTTPGateway struct {
	userService services.IUserService
	kneepadsService services.IKneepadsService
	eventService services.IEventService
}

func NewHTTPGateway(app *fiber.App, userService services.IUserService, 
	kneepadsService services.IKneepadsService, eventService services.IEventService) {
	gateway := &HTTPGateway{
		userService: userService,
		kneepadsService: kneepadsService,
		eventService: eventService,
	}

	GatewayUser(*gateway,app)
	GatewayKneepads(*gateway,app)
	GatewayEvent(*gateway,app)
}