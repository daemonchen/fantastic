package models

import (
	// "encoding/json"
	"labix.org/v2/mgo"
	"labix.org/v2/mgo/bson"
)

type Post struct {
	// Id      bson.ObjectId          `bson:"_id,omitempty"`
	Title   string                 `bson:"title"`
	Content string                 `bson:"content"`
	Stamp   string                 `bson:"stamp"`
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

func SavePost(s *mgo.Session, title string, content string, stamp string) error {
	err := getPostsCollection(s).Insert(&Post{Title: title, Content: content, Stamp: stamp})
	if err != nil {
		panic(err)
	}
	return err
}

func GetAllPosts(s *mgo.Session) (posts []*Post) {
	err := getPostsCollection(s).Find(nil).All(&posts)
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
