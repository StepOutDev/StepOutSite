package entities

type KneepadsDataFormat struct {
	Number string `json:"number" bson:"number,omitempty"`
	Size   string `json:"size" bson:"size,omitempty"`
	//["available","booked","disappear","unavailable","pending"]
	Status string `json:"status" bson:"status,omitempty"`
	BookingDate string `json:"booking_date" bson:"booking_date,"`
	ReturnDate string `json:"return_date" bson:"return_date,omitempty"`
	Image string `json:"image" bson:"image,omitempty"`
	StudentID string `json:"student_id" bson:"student_id,omitempty"`
}