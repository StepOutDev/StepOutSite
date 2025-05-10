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
	"go.mongodb.org/mongo-driver/mongo/options"
)

type eventRepository struct {
	Context    context.Context
	Collection *mongo.Collection
}

type IEventRepository interface {
	GetAllEvents() (*[]entities.EventDataFormat, error)
	UpdateEvent(eventName string, event entities.EventDataFormat) error
	DeleteEvent(eventName string) error
	CreateEvent(event entities.EventDataFormat) error
	GetOneEvent(eventName string) (entities.EventDataFormat,error)
}

func NewEventRepository(db *MongoDB) IEventRepository {
	return &eventRepository{
		Context:    db.Context,
		Collection: db.MongoDB.Database(os.Getenv("DATABASE_NAME")).Collection("event"),
	}
}

func (repo eventRepository) GetAllEvents() (*[]entities.EventDataFormat, error){
	result := []entities.EventDataFormat{}

	cursor ,err := repo.Collection.Find(repo.Context, bson.M{},options.Find())

	if err != nil {
		return nil,err
	}
	defer cursor.Close(repo.Context)

	for cursor.Next(repo.Context) {
		var user entities.EventDataFormat

		err = cursor.Decode(&user)
		if err != nil {
			fmt.Println("cannot get user repo")
			return nil,err
		}
		result = append(result, user)
	}

	return &result,nil
}


func (repo eventRepository) CreateEvent(event entities.EventDataFormat) error {
	_,err := repo.Collection.InsertOne(repo.Context, event)

	if err != nil{
		return err
	}

	return nil
}

func (repo eventRepository) DeleteEvent(eventName string) error {
	filter := bson.M{"event_name":eventName}
	_,err := repo.Collection.DeleteOne(repo.Context,filter)
	if err != nil{
		return err
	}
	return nil
}

func (repo eventRepository) UpdateEvent(eventName string, event entities.EventDataFormat) error {
	filter := bson.M{"event_name":eventName}
	update := bson.M{"$set":event}
	_,err := repo.Collection.UpdateOne(repo.Context,filter,update)
	if err != nil{
		return err
	}
	return nil
}	

func (repo eventRepository) GetOneEvent(eventName string) (entities.EventDataFormat,error){
	var result entities.EventDataFormat
	event := repo.Collection.FindOne(repo.Context,bson.M{"event_name":eventName}).Decode(&result)
	if event == mongo.ErrNoDocuments{
		return result,errors.New("event not found")
	}
	return result,nil
}