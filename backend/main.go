package main

import (
	"log"
	"os"
	"stepoutsite/configuration"
	"stepoutsite/domain/datasources"
	"stepoutsite/domain/repositories"
	"stepoutsite/src/gateways"
	"stepoutsite/src/middlewares"
	"stepoutsite/src/services"

	"github.com/gofiber/contrib/swagger"
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
	app.Use(swagger.New(swagger.Config{
		BasePath: "/api/",
		FilePath: "./docs/swagger.yaml",
		Path:     "docs",
	}))
	app.Use(recover.New())
	app.Use(cors.New())

	mongodb := datasources.NewMongoDB(10)

	userMongo := repositories.NewUserRepository(mongodb)
	kneepadsMongo := repositories.NewKneepadsRepository(mongodb)

	userService := services.NewUserService(userMongo)
	kneepadsService := services.NewKneepadsService(kneepadsMongo, userService)

	gateways.NewHTTPGateway(app, userService, kneepadsService)

	PORT := os.Getenv("DB_PORT_LOGIN")

	if PORT == "" {
		PORT = "5000"
	}

	app.Listen(":" + PORT)
}
