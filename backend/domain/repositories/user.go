package repositories

import (
	"context"
	// "errors"
	// "fmt"
	"os"
	. "stepoutsite/domain/datasources"
	"stepoutsite/domain/entities"

	// "go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	// "go.mongodb.org/mongo-driver/mongo/options"
)

type userRepository struct {
	Context context.Context
	Collection *mongo.Collection
}

type IUserRepository interface {
	// GetAllUsers() ([]entities.UserDataFormat, error)
	CreateUser(user entities.UserDataFormat) error
}

func NewUserRepository(db *MongoDB) IUserRepository {
	return &userRepository{
		Context:    db.Context,
		Collection: db.MongoDB.Database(os.Getenv("DATABASE_NAME")).Collection("user"),
	}
}

// func (repo userRepository) GetAllUsers() ([]entities.UserDataFormat, error){
// 	result := []entities.UserDataFormat{}

// 	cursor ,err := repo.Collection.Find(repo.Context, bson.M{},options.Find())

// 	if err != nil {
// 		return nil,err
// 	}
// 	defer cursor.Close(repo.Context)

// 	for cursor.Next(repo.Context) {
// 		var user entities.UserDataFormat

// 		err = cursor.Decode(&user)
// 		if err != nil {
// 			fmt.Println("cannot get user repo")
// 			return nil,err
// 		}
// 		result = append(result, user)
// 	}

// 	return result,nil
// }


func (repo userRepository) CreateUser(user entities.UserDataFormat) error {
	_, err := repo.Collection.InsertOne(repo.Context, user)

	if err != nil {
		return err
	}

	return nil
}