package models

import (
	// "encoding/json"
	"labix.org/v2/mgo"
	"labix.org/v2/mgo/bson"
)

type Tag struct {
	Id    bson.ObjectId          `bson:"_id,omitempty"`
	Tag   string                 `bson:"tag"`
	Stamp string                 `bson:"stamp"`
	Title string                 `bson:"title"`
	Meta  map[string]interface{} `bson:",omitempty"`
}

func getTagsCollection(s *mgo.Session) *mgo.Collection {
	return s.DB("fantastic").C("tags")
}

func (t *Tag) Save(s *mgo.Session) error {
	_, err := getTagsCollection(s).Upsert(bson.M{"_id": t.Id}, t)
	return err
}

func GetAllTags(s *mgo.Session) (tags []*Tag) {
	getTagsCollection(s).Find(nil).All(&tags)
	return
}

func (t *Tag) AddMeta(s *mgo.Session) {
	if t.Meta == nil {
		t.Meta = make(map[string]interface{})
	}
	t.Meta["Tags"] = GetTagsByStamp(s, t.Stamp)
}

func GetTagsByStamp(s *mgo.Session, stamp string) (tags []*Tag) {
	getTagsCollection(s).Find(bson.M{"stamp": stamp}).All(&tags)
	return
}

func GetTagsByTag(s *mgo.Session, tag string) (tags []*Tag) {
	getTagsCollection(s).Find(bson.M{"tag": tag}).All(&tags)
	for _, tag := range tags {
		tag.AddMeta(s)
	}
	return
}

func DeleteTag(s *mgo.Session, stamp string, tag string) error {
	err := getTagsCollection(s).Remove(bson.M{"stamp": stamp, "tag": tag})
	if err != nil {
		panic(err)
	}
	return err
}
