package entities

type KneepadsDataFormat struct {
	Number string `json:"number" bson:"number,omitempty"`
	Size   string `json:"size" bson:"size,omitempty"`
	//["available","booked","disappear","unavailable","pending"]
	Status string `json:"status" bson:"status,omitempty"`
	BookingDate string `json:"booking_date" bson:"booking_date,omitempty"`
	ReturnDate string `json:"return_date" bson:"return_date,omitempty"`
	NickName string `json:"nick_name" bson:"nick_name,omitempty"`
	Year string `json:"year" bson:"year,omitempty"`
	Major string `json:"major" bson:"major,omitempty"`
}