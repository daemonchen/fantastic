package controllers

import (
	// "encoding/json"
	"fantastic/app/models"
	"github.com/jgraham909/revmgo"
	"github.com/revel/revel"
	// "github.com/revel/revel/cache"
	// "labix.org/v2/mgo/bson"
	// "fmt"
)

type Comment struct {
	*revel.Controller
	revmgo.MongoController
}

func (c *Comment) GetPostByStamp(stamp string) revel.Result {
	comments := models.GetCommentsByStamp(c.MongoSession, stamp)
	return c.RenderJson(comments)

}
