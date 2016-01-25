package controllers

import (
    "fantastic/app/models"
    // "fmt"
    "github.com/janekolszak/revmgo"
    "github.com/revel/revel"
    // "labix.org/v2/mgo/bson"
    "github.com/russross/blackfriday"
    // "html/template"
    "encoding/json"
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
func (c *Edit) Post(post *models.Post) revel.Result {
    post.Stamp = strconv.FormatInt(time.Now().UnixNano()/1e6, 10)

    decoder := json.NewDecoder(c.Request.Body)
    decoder.Decode(&post)

    err := post.Save(c.MongoSession)
    if err != nil {
        panic(err)
        return c.RenderJson(&Result{"failed", "article saved failed"})
    } else {
        revel.INFO.Println("post to save success")
        return c.RenderJson(&post)
    }
}

func (c *Edit) Preview(post *models.Post) revel.Result {
    decoder := json.NewDecoder(c.Request.Body)
    decoder.Decode(&post)
    post.Content = string(blackfriday.MarkdownBasic([]byte(post.Content)))
    return c.RenderJson(&post)
}
