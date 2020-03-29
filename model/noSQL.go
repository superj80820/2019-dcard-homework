package noSQL

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Ip struct {
	IPAddress   string
	Count       int
	ExpiresTime int64
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
