package controllers

import (
    "fantastic/app/models"
    // "fmt"
    "crypto/md5"
    "fmt"
    "github.com/jgraham909/revmgo"
    "github.com/revel/revel"
    "labix.org/v2/mgo/bson"
)

type Admin struct {
    *revel.Controller
    revmgo.MongoController
}

type Result struct {
    status string
    data   string
}

func (c Admin) Index() revel.Result {
    return c.Render()

}

func (c Admin) Login(username string, password string) revel.Result {
    responseJson := &Result{}
    user := models.GetUserByName(c.MongoSession, username)
    if password == user.Password {
        c.Response.Status = 200
        c.Session["islogin"] = "true"
        return c.RenderJson(responseJson)
    } else {
        responseJson = &Result{"caicaikana", "login failed"}
        c.Response.Status = 403
        c.Session["islogin"] = "false"
        return c.RenderJson(responseJson)

    }
}

func (c Admin) Register(username string, password string) revel.Result {
    pwd := fmt.Sprintf("%x", md5.Sum([]byte(password)))
    user := &models.User{bson.NewObjectId(), username, pwd}
    err := user.Save(c.MongoSession)
    if err != nil {
        panic(err)
        return c.RenderJson(&Result{"failed", "err"})
    } else {
        revel.INFO.Println("register success")
        return c.RenderJson(&Result{"success", "register"})
    }
}
