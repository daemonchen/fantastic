package models

import (
	// "encoding/json"
	"labix.org/v2/mgo"
	"labix.org/v2/mgo/bson"
)

type Task struct {
	ID    bson.ObjectId `bson:"_id,omitempty"`
	Title string        `bson:"title"`
	Done  bool          `bson:"content"`
	// Stamp string `bson:"stamp"`
}

func getTasksCollection(s *mgo.Session) *mgo.Collection {
	return s.DB("fantastic").C("tasks")
}

func GetAllTasks(s *mgo.Session) (tasks []*Task) {
	getTasksCollection(s).Find(nil).All(&tasks)
	return
}

func SaveToDoList(s *mgo.Session, title string, done bool) {
	getTasksCollection(s).Insert(&Task{bson.NewObjectId(), title, done})

}

func UpdateToDo(s *mgo.Session, task *Task) error {
	// getTasksCollection(s).Update(selector, change)
	return nil
}
