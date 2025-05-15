package gateways

import (
	"io/ioutil"
	"stepoutsite/domain/entities"
	"stepoutsite/src/middlewares"

	"github.com/gofiber/fiber/v2"
)

func (h *HTTPGateway) GetAllBanners(ctx *fiber.Ctx) error {
	banners, err := h.bannerService.GetAllBanners();

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}

	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "successfully get all banners", Data: banners})

}

func (h *HTTPGateway) CreateBanner(ctx *fiber.Ctx) error {
	token,err := middlewares.DecodeJWTToken(ctx)
	if err!=nil || token==nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "Unauthorization Token."})
	}
	bannerName := ctx.FormValue("banner_name")
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

	var banner = entities.BannerDataFormat{
		BannerName: bannerName,
	}

	err = h.bannerService.CreateBanner(banner, token.StudentID, imageByte)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}

	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "successfully create banner"})
}

func (h *HTTPGateway) DeleteBanner(ctx *fiber.Ctx) error {
	token,err := middlewares.DecodeJWTToken(ctx)
	if err!=nil || token==nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "Unauthorization Token."})
	}
	params := ctx.Queries()
	bannerName := params["banner_name"]

	err = h.bannerService.DeleteBanner(bannerName, token.StudentID)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: err.Error()})
	}

	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "successfully delete banner"})
}