package repositories

import (
	"context"
	"fmt"
	"os"
	. "stepoutsite/domain/datasources"
	"stepoutsite/domain/entities"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type bannerRepository struct {
	Context    context.Context
	Collection *mongo.Collection
}

type IBannerRepository interface {
	GetAllBanners() (*[]entities.BannerDataFormat, error)
	CreateBanner(banner entities.BannerDataFormat) (error)
	DeleteBanner(bannerName string) (error)
}

func NewBannerRepository(db *MongoDB) IBannerRepository {
	return &bannerRepository{
		Context:    db.Context,
		Collection: db.MongoDB.Database(os.Getenv("DATABASE_NAME")).Collection("banner"),
	}
}

func (repo bannerRepository) GetAllBanners() (*[]entities.BannerDataFormat, error){
	result := []entities.BannerDataFormat{}

	cursor ,err := repo.Collection.Find(repo.Context, bson.M{},options.Find())

	if err != nil {
		return nil,err
	}
	defer cursor.Close(repo.Context)

	for cursor.Next(repo.Context) {
		var banner entities.BannerDataFormat

		err = cursor.Decode(&banner)
		if err != nil {
			fmt.Println("cannot get banner data")
			return nil,err
		}
		result = append(result, banner)
	}

	return &result,nil
}


func (repo bannerRepository) CreateBanner(banner entities.BannerDataFormat) (error) {
	_, err := repo.Collection.InsertOne(repo.Context, banner)
	
	if err != nil {
		return err
	}

	return nil
}

func (repo bannerRepository) DeleteBanner(bannerName string) (error) {
	_, err := repo.Collection.DeleteOne(repo.Context, bson.M{"banner_name": bannerName})

	if err != nil {
		return err
	}

	return nil
}