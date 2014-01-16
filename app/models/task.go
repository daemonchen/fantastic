package models

import (
	// "encoding/json"
	"labix.org/v2/mgo"
	// "labix.org/v2/mgo/bson"
)

type Task struct {
	ID    int    `bson:"_id,omitempty"`
	Title string `bson:"title"`
	Done  bool   `bson:"content"`
	// Stamp string `bson:"stamp"`
}

func getTasksCollection(s *mgo.Session) *mgo.Collection {
	return s.DB("fantastic").C("tasks")
}

func GetAllTasks(s *mgo.Session) (tasks []*Task) {
	tasks = append(tasks, &Task{2, "todo balabala", false})
	// getTasksCollection(s).Find(nil).All(&tasks)
	return
}

func UpdateToDo(s *mgo.Session, task *Task) error {
	// getTasksCollection(s).Update(selector, change)
	return nil
}
