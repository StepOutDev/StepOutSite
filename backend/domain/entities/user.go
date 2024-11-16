package entities

type UserDataFormat struct {
	StudentID       string `json:"student_id" bson:"student_id"`
	FirstName 		string `json:"first_name" bson:"first_name"`
	LastName  		string `json:"last_name" bson:"last_name"`
	NickName  		string `json:"nick_name" bson:"nick_name"`
	Year     		string `json:"year" bson:"year"`
	Major    		string `json:"major" bson:"major"`
	Role     		string `json:"role" bson:"role"`
	Password 		string `json:"password" bson:"password"`
	Image    		string `json:"image" bson:"image"`
	Telephone 		string `json:"telephone" bson:"telephone"`
	Instagram       string `json:"instagram" bson:"instagram"`
}