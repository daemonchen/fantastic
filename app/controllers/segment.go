package controllers

import (
	// "fmt"
	"github.com/janekolszak/revmgo"
	"github.com/revel/revel"
)

type Segment struct {
	*revel.Controller
	revmgo.MongoController
}

func (c *Segment) Index() revel.Result {
	controllerName := "segment"
	return c.Render(controllerName)
}
