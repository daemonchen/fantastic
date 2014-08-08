package controllers

import (
	"fantastic/app/models"
	// "fmt"
	"github.com/jgraham909/revmgo"
	"github.com/revel/revel"
	"labix.org/v2/mgo/bson"
	"strconv"
	"time"
)

type Edit struct {
	*revel.Controller
	revmgo.MongoController
}

func (c Edit) Index() revel.Result {
	if c.Session["islogin"] != "true" {
		return c.Redirect(Admin.Index)
	}
	controllerName := "edit"
	return c.Render(controllerName)

}
func (c *Edit) Post(title string, content string) revel.Result {
	responseJson := &result{"success", "article saved success"}
	// post := models.GetPostModel(bson.NewObjectId(), title, content, strconv.FormatInt(time.Now().Unix(), 10))
	err := models.SavePost(c.MongoSession, bson.NewObjectId(), title, content, strconv.FormatInt(time.Now().UnixNano()/1e6, 10))
	if err != nil {
		panic(err)
		return c.RenderJson(&result{"failed", "article saved failed"})
	} else {
		revel.INFO.Println("post to save success")
		return c.RenderJson(responseJson)
	}
}
