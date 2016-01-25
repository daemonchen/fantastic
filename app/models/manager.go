package models

import (
	// "encoding/json"
	"labix.org/v2/mgo"
	"labix.org/v2/mgo/bson"
)

type Manager struct {
	Id       bson.ObjectId `bson:"_id,omitempty"`
	UserName string        `bson:"username"`
	PassWord string        `bson:"password"`
}

func getManageeCollection(s *mgo.Session) *mgo.Collection {
	return s.DB("fantastic").C("adminMailAccount")
}

func GetManager(s *mgo.Session) (manager *Manager) {
	getManageeCollection(s).Find(nil).One(&manager)
	return
}
