package models

import (
	// "encoding/json"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type Version struct {
	Id    bson.ObjectId `bson:"_id,omitempty"`
	Name  string        `bson:"name"`
	Phone string        `bson:"phone"`
	Stamp string        `bson:"stamp"`
}

func VersionCollection(s *mgo.Session) *mgo.Collection {
	return s.DB("fantastic").C("people")
}

func (b *Version) Save(s *mgo.Session) error {
	_, err := VersionCollection(s).Upsert(bson.M{"name": b.Id}, b)
	return err
}

func (b *Version) Delete(s *mgo.Session) error {
	return VersionCollection(s).RemoveId(b.Id)
}
