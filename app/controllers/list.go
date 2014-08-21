package controllers

import (
	// "encoding/json"
	// "fantastic/app/models"
	// "fmt"
	"github.com/jgraham909/revmgo"
	"github.com/revel/revel"
	// "labix.org/v2/mgo/bson"
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
