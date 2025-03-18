package entities

type EventDataFormat struct {
	EventName string `json:"event_name" bson:"event_name,omitempty"`;
	Day string `json:"day" bson:"day,omitempty"`;
	Time string `json:"time" bson:"time,omitempty"`;
	Place string `json:"place" bson:"place,omitempty"`;
	Song []string `json:"song" bson:"song,omitempty"`;
	Description string `json:"description" bson:"description,omitempty"`;
	Image string `json:"image" bson:"image,omitempty"`;
}