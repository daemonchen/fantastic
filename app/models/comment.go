package models

import (
	// "encoding/json"
	. "fantastic/app/lib/email"
	"fmt"
	"labix.org/v2/mgo"
	"labix.org/v2/mgo/bson"
)

type Comment struct {
	Id            bson.ObjectId `bson:"_id,omitempty"`
	RelativeStamp string        `bson:"relativeStamp"`
	UserName      string        `bson:"userName"`
	UserEmail     string        `bson:"userEmail"`
	CommentText   string        `bson:"commentText"`
	CommentTime   string        `bson:"commentTime,omitempty"`
}

func getCommentCollection(s *mgo.Session) *mgo.Collection {
	return s.DB("fantastic").C("comments")
}

func sendMailToManager(m *Manager, c *Comment) {
	emailTitle := fmt.Sprintf("Here is the new comment from %s\n", c.UserName)
	emailContent := fmt.Sprintf(" The comment is:\n %s You can scan the post in http://115.29.47.52/post/index?stamp=%s ", c.CommentText, c.RelativeStamp)
	Mail(m.UserName, m.PassWord, emailTitle, emailContent)
}
func (comment *Comment) Save(s *mgo.Session) error {
	_, err := getCommentCollection(s).Upsert(bson.M{"commentTime": comment.CommentTime}, comment)
	if err != nil {
		panic(err)
	}
	return err
	// manager := GetManager(s)
	// go sendMailToManager(manager, comment)
}

func GetCommentsByStamp(s *mgo.Session, stamp string) (comments []*Comment) {
	getCommentCollection(s).Find(bson.M{"relativeStamp": stamp}).Sort("-commentTime").All(&comments)
	return
}
