package database

import (
	"context"
	"fmt"
	"time"

	"github.com/om13rajpal/notion-notes/config"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

var (
	UserCollection *mongo.Collection
)

func ConnectMongo() {
	clientOptions := options.Client().ApplyURI(config.MONGO_URI)

	client, err := mongo.Connect(clientOptions)

	if err != nil {
		fmt.Println("Error connecting to MongoDB:", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Ping(ctx, nil)

	if err != nil {
		fmt.Println("Error pinging MongoDB:", err)
	} else {
		fmt.Println("Connected to MongoDB!")
	}

	UserCollection = client.Database("notes").Collection("users")
}
