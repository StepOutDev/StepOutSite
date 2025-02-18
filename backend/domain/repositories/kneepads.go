package repositories

import (
	"context"
	"errors"
	"os"
	. "stepoutsite/domain/datasources"
	"stepoutsite/domain/entities"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type kneepadsRepository struct {
	Context context.Context
	Collection *mongo.Collection
}

type IKneepadsRepository interface{
	CreateKneepads(kneepads entities.KneepadsDataFormat) error
	GetOneKneepads(number string) (entities.KneepadsDataFormat,error)
	GetAllKneepads(filter bson.M) (*[]entities.KneepadsDataFormat, error)
	UpdateKneepads(number string, kneepads entities.KneepadsDataFormat) error
	DeleteKneepads(number string) error
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

func(repo kneepadsRepository) GetAllKneepads(filter bson.M) (*[]entities.KneepadsDataFormat, error){
	result := []entities.KneepadsDataFormat{}

	sort := options.Find().SetSort(bson.D{{"number", 1}})
	cursor,err := repo.Collection.Find(repo.Context,filter,sort)
	if err != nil{
		return nil,err
	}
	defer cursor.Close(repo.Context)

	for cursor.Next(repo.Context){
		var kneepads entities.KneepadsDataFormat

		err = cursor.Decode(&kneepads)
		if err != nil{
			return nil,err
		}
		result = append(result,kneepads)
	}

	return &result,nil
}

func(repo kneepadsRepository) UpdateKneepads(number string, kneepads entities.KneepadsDataFormat) error {
	filter := bson.M{"number":number}
	update := bson.M{"$set":kneepads}
	_,err := repo.Collection.UpdateOne(repo.Context,filter,update)
	if err != nil{
		return err
	}
	return nil
}

func(repo kneepadsRepository) DeleteKneepads(number string) error {
	filter := bson.M{"number":number}
	_,err := repo.Collection.DeleteOne(repo.Context,filter)
	if err != nil{
		return err
	}
	return nil
}