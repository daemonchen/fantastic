package models

import (
    // "encoding/json"
    "github.com/russross/blackfriday"
    "gopkg.in/mgo.v2"
    "gopkg.in/mgo.v2/bson"
)

type Post struct {
    // Id      bson.ObjectId          `bson:"_id,omitempty"`
    Title   string                 `bson:"title"`
    Content string                 `bson:"content"`
    Stamp   string                 `bson:"stamp,omitempty"`
    Meta    map[string]interface{} `bson:",omitempty"`
}

func getPostsCollection(s *mgo.Session) *mgo.Collection {
    return s.DB("fantastic").C("posts")
}

func (post *Post) AddMeta(s *mgo.Session) {
    if post.Meta == nil {
        post.Meta = make(map[string]interface{})
    }
    post.Meta["Tags"] = GetTagsByStamp(s, post.Stamp)
    // post.Meta["markdown"] = template.HTML(string(blackfriday.MarkdownBasic([]byte(post.Body))))

    // if len(post.Body) > trimLength {
    // 	post.Meta["teaser"] = template.HTML(string(blackfriday.MarkdownBasic([]byte(post.Body[0:trimLength]))))
    // } else {
    // 	post.Meta["teaser"] = template.HTML(string(blackfriday.MarkdownBasic([]byte(post.Body[0:len(post.Body)]))))
    // }
}

func (post *Post) Save(s *mgo.Session) error {
    _, err := getPostsCollection(s).Upsert(bson.M{"stamp": post.Stamp}, post)
    if err != nil {
        panic(err)
    }
    return err
}

func GetAllPosts(s *mgo.Session) (posts []*Post) {
    err := getPostsCollection(s).Find(nil).Sort("-stamp").All(&posts)
    if err != nil {
        return
    }
    for _, post := range posts {
        post.AddMeta(s)
    }
    return
}

func GetPostByStamp(s *mgo.Session, stamp string) (p *Post) {
    getPostsCollection(s).Find(bson.M{"stamp": stamp}).One(&p)
    p.Content = string(blackfriday.MarkdownBasic([]byte(p.Content)))
    return
}

func UpdatePost(s *mgo.Session, stamp string, content string) error {
    colQuerier := bson.M{"stamp": stamp}
    change := bson.M{"$set": bson.M{"content": content}}

    err := getPostsCollection(s).Update(colQuerier, change)
    if err != nil {
        panic(err)
    }
    return err
}

func DeletePost(s *mgo.Session, stamp string) error {
    err := getPostsCollection(s).Remove(bson.M{"stamp": stamp})
    if err != nil {
        panic(err)
    }
    return err
}
