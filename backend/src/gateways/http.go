package gateways

import (
	"stepoutsite/src/services"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/oauth2"
)

type HTTPGateway struct {
	oauth *oauth2.Config
	userService services.IUserService
	kneepadsService services.IKneepadsService
	eventService services.IEventService
}

func NewHTTPGateway(app *fiber.App,oauth *oauth2.Config ,userService services.IUserService, 
	kneepadsService services.IKneepadsService, eventService services.IEventService) {
	gateway := &HTTPGateway{
		oauth: oauth,
		userService: userService,
		kneepadsService: kneepadsService,
		eventService: eventService,
	}

	GatewayUser(*gateway,app)
	GatewayKneepads(*gateway,app)
	GatewayEvent(*gateway,app)
}