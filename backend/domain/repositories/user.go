package repositories

import (
	"context"
	"errors"
	"fmt"
	"os"
	. "stepoutsite/domain/datasources"
	"stepoutsite/domain/entities"
	"stepoutsite/src/middlewares"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
)

type userRepository struct {
	Context context.Context
	Collection *mongo.Collection
}

type IUserRepository interface {
	GetAllUsers(filter bson.M) (*[]entities.UserResponseFormat, error)
	CreateUser(user entities.UserDataFormat) error
	Login(req *entities.UserDataFormat) (string,error)
	GetOneUser(studentID string) (entities.UserDataFormat, error)
	GetOneUserByEmail(email string) (entities.UserDataFormat, error)
	UpdateUser(studentID string,user entities.UserDataFormat) error
	DeleteUser(studentID string) error
	GetMe(studentID string) (entities.UserResponseFormat, error)
}

func NewUserRepository(db *MongoDB) IUserRepository {
	return &userRepository{
		Context:    db.Context,
		Collection: db.MongoDB.Database(os.Getenv("DATABASE_NAME")).Collection("user"),
	}
}

func (repo userRepository) GetAllUsers(filter bson.M) (*[]entities.UserResponseFormat, error){
	result := []entities.UserResponseFormat{}

	cursor ,err := repo.Collection.Find(repo.Context, filter,options.Find())

	if err != nil {
		return nil,err
	}
	defer cursor.Close(repo.Context)

	for cursor.Next(repo.Context) {
		var user entities.UserResponseFormat

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

func (repo userRepository) GetOneUser(studentID string) (entities.UserDataFormat, error){
	var result entities.UserDataFormat
	filter := bson.M{"student_id": studentID}
	user := repo.Collection.FindOne(repo.Context, filter).Decode(&result)
	if user == mongo.ErrNoDocuments {
		return result, errors.New("user not found")
	}
	return result,nil
}

func (repo userRepository) GetOneUserByEmail(email string) (entities.UserDataFormat, error){
	var result entities.UserDataFormat
	filter := bson.M{"email": email}
	user := repo.Collection.FindOne(repo.Context, filter).Decode(&result)
	if user == mongo.ErrNoDocuments {
		return result, errors.New("user not found")
	}
	return result,nil
}

func (repo userRepository) Login(req *entities.UserDataFormat) (string,error) {
	tokenDetails, err := middlewares.GenerateJWTToken(req.StudentID)
	if err != nil {
		return "", err
	}
	return *tokenDetails.Token, nil
}

func (repo userRepository) UpdateUser(studentID string,user entities.UserDataFormat) error {
	filter := bson.M{"student_id": studentID}
	if user.Password != "" {
		password,err := hashAndSalt(user.Password)
		if err != nil {
			return err
		}
		user.Password = password
	}
	update := bson.M{"$set": user}
	_,err := repo.Collection.UpdateOne(repo.Context, filter, update)
	if err != nil {
		return err
	}
	return nil
}

func (repo userRepository) DeleteUser(studentID string) error {
	filter := bson.M{"student_id": studentID}
	_,err := repo.Collection.DeleteOne(repo.Context, filter)
	if err != nil {
		return err
	}
	return nil
}

func (repo userRepository) GetMe(studentID string) (entities.UserResponseFormat, error){
	var result entities.UserResponseFormat
	filter := bson.M{"student_id": studentID}
	user := repo.Collection.FindOne(repo.Context, filter).Decode(&result)
	if user == mongo.ErrNoDocuments {
		return result, errors.New("user not found")
	}
	return result,nil
}