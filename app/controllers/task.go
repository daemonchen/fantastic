package controllers

import (
	// "encoding/json"
	"fantastic/app/models"
	"github.com/jgraham909/revmgo"
	"github.com/robfig/revel"

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

func (c *Task) ListTasks() revel.Result {
	tasks := models.GetAllTasks(c.MongoSession)
	result := &Tasks{tasks}
	return c.RenderJson(result)
}

func (c *Task) NewTask(arg string) revel.Result {
	print(">>>>>>NewTask:", arg)
	return c.RenderJson("ff")
}

func (c *Task) GetTask() revel.Result {
	return c.RenderJson("ff")
}

func (c *Task) UpdateTask(id int, title string, done bool) revel.Result {
	err := models.UpdateToDo(c.MongoSession, &models.Task{id, title, done})
	if err != nil {
		panic(err)
	}
	return c.RenderJson("success")
}
