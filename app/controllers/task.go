package controllers

import (
	"encoding/json"
	"fantastic/app/models"
	"github.com/jgraham909/revmgo"
	"github.com/revel/revel"
	"labix.org/v2/mgo/bson"

	// "strconv"
)

type Task struct {
	*revel.Controller
	revmgo.MongoController
}

// Example:
//
//   req: GET /task/
//   res: 200 {"Tasks": [
//          {"ID": 1, "Title": "Learn Go", "Done": false},
//          {"ID": 2, "Title": "Buy bread", "Done": true}
//        ]}
type Tasks struct {
	Tasks []*models.Task
}

type ToDoContent struct {
	Content string
	Done    bool
}

func (c *Task) ListTasks() revel.Result {
	tasks := models.GetAllTasks(c.MongoSession)
	result := &Tasks{tasks}
	return c.RenderJson(result)
}

func (c *Task) NewTask() revel.Result {
	// print(">>>>>>NewTask:", content, "\n")
	// result := &models.Task{2, "c.Request.Body", false}
	decoder := json.NewDecoder(c.Request.Body)
	var content ToDoContent
	if err := decoder.Decode(&content); err != nil {
		print(">>>err:", err)
	} else {
		models.SaveToDoList(c.MongoSession, content.Content, content.Done)
	}
	json.Marshal(content)
	return c.RenderJson(content)
}

func (c *Task) GetTask() revel.Result {
	return c.RenderJson("ff")
}

func (c *Task) UpdateTask(id bson.ObjectId, title string, done bool) revel.Result {
	err := models.UpdateToDo(c.MongoSession, &models.Task{id, title, done})
	if err != nil {
		panic(err)
	}
	return c.RenderJson("success")
}
