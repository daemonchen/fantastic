package controllers

import (
	// "encoding/json"
	// "crypto/md5"
	"fantastic/app/models"
	"github.com/jgraham909/revmgo"
	"github.com/revel/revel"
	// "github.com/revel/revel/cache"
	// "io"
	"labix.org/v2/mgo/bson"
	// "fmt"
	// "math/rand"
	// "strconv"
	// "time"
)

type Tag struct {
	*revel.Controller
	revmgo.MongoController
}

func (c *Tag) Save(tag string, stamp string, title string) revel.Result {
	t := &models.Tag{bson.NewObjectId(), tag, stamp, title}
	err := t.Save(c.MongoSession)
	if err != nil {
		return c.RenderJson(&BayesLearnResult{"failed", tag})
	}
	return c.RenderJson(&BayesLearnResult{"success", tag})
}
func (c *Tag) GetAllTags() revel.Result {
	tags := models.GetAllTags(c.MongoSession)
	return c.RenderJson(tags)
}

func (c *Tag) GetByStamp(stamp string) revel.Result {
	tags := models.GetByStamp(c.MongoSession, stamp)
	return c.RenderJson(tags)
}

func (c *Tag) GetByTag(tag string) revel.Result {
	tags := models.GetByTag(c.MongoSession, tag)
	return c.RenderJson(tags)
}

func (c *Tag) Delete(stamp string, tag string) revel.Result {
	err := models.DeleteTag(c.MongoSession, stamp, tag)
	if err != nil {
		panic(err)
	}
	return c.RenderJson(&Result{"success", "tag delete success"})
}
