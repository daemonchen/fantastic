package controllers

import (
	// "encoding/json"
	// "fantastic/app/models"
	// "fmt"
	"github.com/daemonchen/revmgo"
	"github.com/revel/revel"
	// "gopkg.in/mgo.v2/bson"
	// "strconv"
	// "time"
)

type List struct {
	*revel.Controller
	revmgo.MongoController
}

func (c List) Index() revel.Result {
	controllerName := "home"
	return c.Render(controllerName)
}
