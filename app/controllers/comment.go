package controllers

import (
	// "encoding/json"
	"fantastic/app/models"
	"github.com/jgraham909/revmgo"
	"github.com/revel/revel"
	// "github.com/revel/revel/cache"
	// "labix.org/v2/mgo/bson"
	"encoding/json"
	"fmt"
	"strconv"
	"time"
)

type Comment struct {
	*revel.Controller
	revmgo.MongoController
}

func (c *Comment) AddComment(comment *models.Comment) revel.Result {
	comment.CommentTime = strconv.FormatInt(time.Now().UnixNano()/1e6, 10)

	decoder := json.NewDecoder(c.Request.Body)
	decoder.Decode(&comment)
	err := comment.Save(c.MongoSession)
	fmt.Println(comment, "---")
	if err != nil {
		revel.WARN.Println("occur err when update:", err)
		c.Response.Status = 403
		return c.RenderJson(&BayesLearnResult{"failed", "insert comment failed"})
	}
	c.Response.Status = 200
	return c.RenderJson(&BayesLearnResult{"success", "insert comment success"})

}

func (c *Comment) GetCommentsByStamp(stamp string) revel.Result {
	comments := models.GetCommentsByStamp(c.MongoSession, stamp)
	return c.RenderJson(comments)
}
