package models

import "go.mongodb.org/mongo-driver/v2/bson"

type User struct {
	Id         bson.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Email      string        `bson:"email,omitempty" json:"email,omitempty"`
	Password   string        `bson:"password,omitempty" json:"password,omitempty"`
	IsVerified bool          `bson:"is_verified,omitempty" json:"is_verified,omitempty"`
}
