package noSQL

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var instanceDB *mongo.Client

type Ip struct {
	IPAddress   string
	Count       int
	ExpiresTime int64
}

func GetInstanceDB() *mongo.Client {
	if instanceDB == nil {
		// Set client options
		clientOptions := options.Client().ApplyURI("mongodb://root:example@localhost:27017")
		// Connect to MongoDB
		client, err := mongo.Connect(context.TODO(), clientOptions)
		if err != nil {
			log.Fatal(err)
		}
		// Check the connection
		err = client.Ping(context.TODO(), nil)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println("Connected to MongoDB!")
		instanceDB = client
	}
	return instanceDB
}

func ReadIPDocument(collection *mongo.Collection, field interface{}) (Ip, error) { //TODO:調整讓此不為空interface
	var IPDocument Ip
	err := collection.FindOne(context.TODO(), field).Decode(&IPDocument)
	return IPDocument, err
}

func InsertIPDocument(collection *mongo.Collection, ipAddress string, time int64) (*mongo.InsertOneResult, error) {
	return collection.InsertOne(context.TODO(), Ip{ipAddress, 1, time})
}

func UpdateIPDocument(collection *mongo.Collection, ipAddress string, update interface{}) (*mongo.UpdateResult, error) { //TODO:調整讓此不為空interface
	filter := bson.M{"ipaddress": ipAddress}
	return collection.UpdateOne(context.TODO(), filter, update)
}

func CheckExist(collection *mongo.Collection, field interface{}) (bool, error) { //TODO:調整讓此不為空interface
	count, err := collection.CountDocuments(context.TODO(), field)
	if err != nil {
		return false, err
	}
	if count >= 1 {
		return true, nil
	}
	return false, nil
}
