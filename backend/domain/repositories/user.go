package repositories


import (
	"context"
	// "errors"
	// "fmt"
	"os"
	. "stepoutsite/backend/domain/datasources"
	// "stepoutsite/backend/domain/entities"

	// "go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	// "go.mongodb.org/mongo-driver/mongo/options"
)

type userRepository struct {
	Context context.Context
	Collection *mongo.Collection
}

type IUserRepository interface {
	
}

func NewUserRepository(db *MongoDB) IUserRepository {
	return &userRepository{
		Context:    db.Context,
		Collection: db.MongoDB.Database(os.Getenv("DATABASE_NAME")).Collection("user"),
	}
}

