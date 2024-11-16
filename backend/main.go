package main

import (
	"log"
	"os"
	"stepoutsite/backend/configuration"
	"stepoutsite/backend/domain/datasources"
	"stepoutsite/backend/domain/repositories"
	"stepoutsite/backend/src/gateways"
	"stepoutsite/backend/src/middlewares"
	"stepoutsite/backend/src/services"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/joho/godotenv"
)

func main() {

	// // // remove this before deploy ###################
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	// /// ############################################

	app := fiber.New(configuration.NewFiberConfiguration())
	middlewares.Logger(app)
	app.Use(recover.New())
	app.Use(cors.New())

	mongodb := datasources.NewMongoDB(10)

	userMongo := repositories.NewUserRepository(mongodb)

	userService := services.NewUserService(userMongo)

	gateways.NewHTTPGateway(app,userService)

	PORT := os.Getenv("DB_PORT_LOGIN")

	if PORT == ""{
		PORT = "5000"
	}

	app.Listen(":"+PORT)
}