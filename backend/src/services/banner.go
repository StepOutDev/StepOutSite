package services

import (
	"errors"
	"stepoutsite/domain/entities"
	"stepoutsite/domain/repositories"
	"stepoutsite/src/utils"
	"strings"
)

type bannerService struct {
	BannerRepository repositories.IBannerRepository
	UserService IUserService
}

type IBannerService interface {
	GetAllBanners() (*[]entities.BannerDataFormat, error)
	CreateBanner(banner entities.BannerDataFormat, studentID string, imageByte []byte) error
	DeleteBanner(bannerName string, studentID string) error
}

func NewBannerService(bannerRepository repositories.IBannerRepository, userService IUserService) IBannerService {
	return &bannerService{
		BannerRepository: bannerRepository,
		UserService: userService,
	}
}

func (sv bannerService) GetAllBanners() (*[]entities.BannerDataFormat, error) {
	banners, err := sv.BannerRepository.GetAllBanners()
	if err != nil {
		return nil, err
	}
	return banners, nil
}

func (sv bannerService) CreateBanner(banner entities.BannerDataFormat, studentID string, imageByte []byte) (error) {
	err := sv.UserService.CheckPermissionCoreAndAdmin(studentID)
	if err != nil {
		return err
	}

	if banner.BannerName == ""{
		return errors.New("please fill in banner name")
	}

	if imageByte != nil {
		name := strings.ReplaceAll(banner.BannerName," ","")
		keyName, contentType := utils.CreateKeyNameBannerImage(name, "webp", "")
		if keyName == "" && contentType == ""{
			return errors.New("hashing the key image error")
		}

		imageURL, err := utils.UploadS3FromString(imageByte, keyName, contentType)

		if err != nil {
			return err
		}
		banner.Image = imageURL
	}

	err = sv.BannerRepository.CreateBanner(banner)
	if err != nil {
		return err
	}

	return nil
}

func (sv bannerService) DeleteBanner(bannerName string, studentID string) (error) {
	err := sv.UserService.CheckPermissionCoreAndAdmin(studentID)
	if err != nil {
		return err
	}

	err = sv.BannerRepository.DeleteBanner(bannerName)
	if err != nil {
		return err
	}

	return nil
}