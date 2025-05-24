package gateways

import (
	"context"
	"fmt"
	"io/ioutil"
	"os"
	"stepoutsite/domain/entities"
	"stepoutsite/src/middlewares"
	"time"

	// "stepoutsite/src/middlewares"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"google.golang.org/api/oauth2/v2"
)

func (h *HTTPGateway) CreateUser(ctx *fiber.Ctx) error {
	user := entities.UserDataFormat{}

	// if err := ctx.BodyParser(&user); err != nil {
	// 	return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	// }

	studentID := ctx.FormValue("student_id")
	firstName := ctx.FormValue("first_name")
	lastName := ctx.FormValue("last_name")
	phone := ctx.FormValue("telephone")
	password := ctx.FormValue("password")
	year := ctx.FormValue("year")
	major := ctx.FormValue("major")
	role := ctx.FormValue("role")
	nickName := ctx.FormValue("nick_name")
	instagram := ctx.FormValue("instagram")
	line := ctx.FormValue("line")
	email := ctx.FormValue("email")

	imagefile, err := ctx.FormFile("image")
	var imageByte []byte
	if imagefile != nil {
		if err != nil {
			return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
		}
		image, err := imagefile.Open()
		if err != nil {
			return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
		}
		defer image.Close()
		imageByte, err = ioutil.ReadAll(image)
		if err != nil {
			return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
		}
	} else {
		imageByte = nil
	}

	user = entities.UserDataFormat{
		StudentID:       studentID,
		FirstName:       firstName,
		LastName:        lastName,
		NickName:        nickName,
		Year:            year,
		Major:           major,
		Role:            role,
		Password:        password,
		Telephone:       phone,
		Instagram:       instagram,
		Line:            line,
		Email:           email,
	}

	if err := h.userService.CreateUser(user,imageByte); err != nil {
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
	user, err := h.userService.GetMe(token.StudentID)

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
	fmt.Println(token)
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

func (h *HTTPGateway) UpdateUser(ctx *fiber.Ctx) error {
	token,err := middlewares.DecodeJWTToken(ctx)
	if err != nil || token == nil {
		fmt.Println(err)
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "Unauthorization Token."})
	}

	params := ctx.Queries()
	targetID := params["student_id"]

	user := entities.UserDataFormat{}

	// if err := ctx.BodyParser(&user); err != nil {
	// 	return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	// }

	firstName := ctx.FormValue("first_name")
	lastName := ctx.FormValue("last_name")
	phone := ctx.FormValue("telephone")
	password := ctx.FormValue("password")
	year := ctx.FormValue("year")
	major := ctx.FormValue("major")
	role := ctx.FormValue("role")
	nickName := ctx.FormValue("nick_name")
	instagram := ctx.FormValue("instagram")
	line := ctx.FormValue("line")
	email := ctx.FormValue("email")

	imagefile, err := ctx.FormFile("image")
	var imageByte []byte
	if imagefile != nil {
		if err != nil {
			return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
		}
		image, err := imagefile.Open()
		if err != nil {
			return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
		}
		defer image.Close()
		imageByte, err = ioutil.ReadAll(image)
		if err != nil {
			return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
		}
	} else {
		imageByte = nil
	}

	user = entities.UserDataFormat{
		FirstName:       firstName,
		LastName:        lastName,
		NickName:        nickName,
		Year:            year,
		Major:           major,
		Role:            role,
		Password:        password,
		Telephone:       phone,
		Instagram:       instagram,
		Line:            line,
		Email: 		 	email,
	}
	
	if err := h.userService.UpdateUser(token.StudentID,targetID,user,imageByte); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}

	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "successfully update user"})
}

func (h *HTTPGateway) DeleteUser(ctx *fiber.Ctx) error {
	token,err := middlewares.DecodeJWTToken(ctx)
	if err != nil || token == nil {
		fmt.Println(err)
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "Unauthorization Token."})
	}

	params := ctx.Queries()
	targetID := params["student_id"]

	if err := h.userService.DeleteUser(token.StudentID,targetID); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}

	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "successfully delete user"})
}

func (h *HTTPGateway) GoogleLogin(ctx *fiber.Ctx) error {
	url := h.oauth.AuthCodeURL("randomstate")
	url += "&hd=chula.ac.th"

	if url == "" {
		return ctx.Status(fiber.StatusInternalServerError).SendString("Failed to generate URL")
	}

	return ctx.Redirect(url, fiber.StatusTemporaryRedirect)
}

func (h *HTTPGateway) GoogleCallback(ctx *fiber.Ctx) error {
		params := ctx.Queries()
		//Check state
		if params["state"] != "randomstate" {
			return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "Invalid state"})
		}

		//Authorization code
		code := params["code"]
		token, err := h.oauth.Exchange(context.Background(), code)
		if err != nil {
			return ctx.Status(fiber.StatusInternalServerError).JSON(entities.ResponseModel{Message: "Failed to exchange token"})
		}

		client := h.oauth.Client(context.Background(), token)
		oauth2Service,err := oauth2.New(client)
		if err != nil {
			return ctx.Status(fiber.StatusInternalServerError).JSON(entities.ResponseModel{Message: "Failed to create oauth2 client"})
		}

		userinfo, err := oauth2Service.Userinfo.Get().Do()
		if err != nil {
			return ctx.Status(fiber.StatusInternalServerError).JSON(entities.ResponseModel{Message: "Failed to get user info"})
		}

		tokenDetails, err := h.userService.GoogleCallback(userinfo)
		if err != nil {
			url := os.Getenv("FRONTEND_URL")
			url += "/error?message=" + err.Error()
			return ctx.Redirect(url, fiber.StatusTemporaryRedirect)
			// return ctx.Status(fiber.StatusInternalServerError).JSON(entities.ResponseModel{Message: err.Error()})
		}

		cookie := fiber.Cookie{
			Name: "jwt", 
			Value: tokenDetails, 
			Expires: time.Now().Add(time.Hour * 6),
			HTTPOnly: true,
		}
		ctx.Cookie(&cookie)
		url := os.Getenv("FRONTEND_URL")
		url += "/redirect?token=" + tokenDetails
		return ctx.Redirect(url, fiber.StatusTemporaryRedirect)
		// return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "successfully login", Data: tokenDetails})

}