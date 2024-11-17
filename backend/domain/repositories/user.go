package repositories

import (
	"context"
	"errors"
	"fmt"

	"os"
	. "stepoutsite/domain/datasources"
	"stepoutsite/domain/entities"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type userRepository struct {
	Context context.Context
	Collection *mongo.Collection
}

type IUserRepository interface {
	GetAllUsers(filter bson.M) (*[]entities.UserDataFormat, error)
	CreateUser(user entities.UserDataFormat) error
}

func NewUserRepository(db *MongoDB) IUserRepository {
	return &userRepository{
		Context:    db.Context,
		Collection: db.MongoDB.Database(os.Getenv("DATABASE_NAME")).Collection("user"),
	}
}

func (repo userRepository) GetAllUsers(filter bson.M) (*[]entities.UserDataFormat, error){
	result := []entities.UserDataFormat{}

	cursor ,err := repo.Collection.Find(repo.Context, filter,options.Find())

	if err != nil {
		return nil,err
	}
	defer cursor.Close(repo.Context)

	for cursor.Next(repo.Context) {
		var user entities.UserDataFormat

		err = cursor.Decode(&user)
		if err != nil {
			fmt.Println("cannot get user repo")
			return nil,err
		}
		result = append(result, user)
	}

	return &result,nil
}


func (repo userRepository) CreateUser(user entities.UserDataFormat) error {
	password,err := hashAndSalt(user.Password)
	if err != nil {
		return err
	}
	user.Password = password

	_, err = repo.Collection.InsertOne(repo.Context, user)
	if err != nil {
		return err
	}
	return nil
}

func hashAndSalt(pwd string) (string,error) {
    pwdByte := []byte(pwd)
	hash, err := bcrypt.GenerateFromPassword(pwdByte, bcrypt.MinCost)
    if err != nil {
		return "", errors.New("failed to hash password")
    }
    return string(hash),nil
}

func checkPasswords(hashedPwd string, plainPwd string) error {
    byteHash := []byte(hashedPwd)
	pwd := []byte(plainPwd)
    err := bcrypt.CompareHashAndPassword(byteHash, pwd)
    if err != nil {
        return errors.New("passwords do not match")
    }
    
    return nil
}