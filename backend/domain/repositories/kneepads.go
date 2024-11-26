package repositories

import (
	"context"
	"errors"
	"os"
	. "stepoutsite/domain/datasources"
	"stepoutsite/domain/entities"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type kneepadsRepository struct {
	Context context.Context
	Collection *mongo.Collection
}

type IKneepadsRepository interface{
	CreateKneepads(kneepads entities.KneepadsDataFormat) error
	GetOneKneepads(number string) (entities.KneepadsDataFormat,error)
}

func NewKneepadsRepository(db *MongoDB) IKneepadsRepository {
	return &kneepadsRepository{
		Context:    db.Context,
		Collection: db.MongoDB.Database(os.Getenv("DATABASE_NAME")).Collection("kneepads"),
	}
}

func(repo kneepadsRepository) CreateKneepads(kneepads entities.KneepadsDataFormat) error {
	_,err := repo.Collection.InsertOne(repo.Context, kneepads)

	if err != nil{
		return err
	}

	return nil
}

func(repo kneepadsRepository) GetOneKneepads(number string) (entities.KneepadsDataFormat,error) {
	var result entities.KneepadsDataFormat
	kneepads := repo.Collection.FindOne(repo.Context,bson.M{"number":number}).Decode(&result)
	if kneepads == mongo.ErrNoDocuments{
		return result,errors.New("kneepads not found")
	}
	return result,nil
}