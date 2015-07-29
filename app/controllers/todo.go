package controllers

import (
	// "fmt"
	"github.com/daemonchen/revmgo"
	"github.com/revel/revel"
)

type ToDo struct {
	*revel.Controller
	revmgo.MongoController
}

func (c *ToDo) Index() revel.Result {
	controllerName := "todo"
	return c.Render(controllerName)
}
