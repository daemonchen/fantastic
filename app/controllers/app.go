package controllers

import (
	// "encoding/json"
	"fantastic/app/models"
	// "fmt"
	"github.com/jgraham909/revmgo"
	"github.com/revel/revel"
	// "labix.org/v2/mgo/bson"
	// "strconv"
	// "time"
)

type App struct {
	*revel.Controller
	revmgo.MongoController
}
type posts []interface{}

func (c App) Index() revel.Result {
	controllerName := "home"
	posts := models.GetAllPosts(c.MongoSession)

	return c.Render(controllerName, posts)
}
