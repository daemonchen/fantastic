package controllers

import (
    "encoding/json"
    // "crypto/md5"
    "fantastic/app/models"
    "github.com/jgraham909/revmgo"
    "github.com/revel/revel"
    // "github.com/revel/revel/cache"
    // "io"
    // "labix.org/v2/mgo/bson"
    // "fmt"
    "net/url"
    // "math/rand"
    // "strconv"
    // "time"
)

type Tag struct {
    *revel.Controller
    revmgo.MongoController
}

func (c *Tag) Save(tag *models.Tag) revel.Result {
    decoder := json.NewDecoder(c.Request.Body)
    decoder.Decode(&tag)
    err := tag.Save(c.MongoSession)
    if err != nil {
        return c.RenderJson(&tag)
    }
    return c.RenderJson(&tag)
}
func (c *Tag) GetAllTags() revel.Result {
    tags := models.GetAllTags(c.MongoSession)
    return c.RenderJson(tags)
}

func (c *Tag) GetTagsByTag(tag string) revel.Result {
    tag, _ = url.QueryUnescape(tag)
    tags := models.GetTagsByTag(c.MongoSession, tag)
    return c.RenderJson(tags)
}

func (c *Tag) Delete(stamp string, tag string) revel.Result {
    err := models.DeleteTag(c.MongoSession, stamp, tag)
    if err != nil {
        panic(err)
    }
    return c.RenderJson(&Result{"success", "tag delete success"})
}
