package entities

type UserDataFormat struct {
	StudentID       string `json:"student_id" bson:"student_id,omitempty"`
	FirstName 		string `json:"first_name" bson:"first_name,omitempty"`
	LastName  		string `json:"last_name" bson:"last_name,omitempty"`
	NickName  		string `json:"nick_name" bson:"nick_name,omitempty"`
	Year     		string `json:"year" bson:"year,omitempty"`
	Major    		string `json:"major" bson:"major,omitempty"`
	// ["user","pending","member", "core", "admin"]
	Role     		string `json:"role" bson:"role,omitempty"`
	Password 		string `json:"password" bson:"password,omitempty"`
	Image    		string `json:"image" bson:"image,omitempty"`
	Telephone 		string `json:"telephone" bson:"telephone,omitempty"`
	Instagram       string `json:"instagram" bson:"instagram,omitempty"`
	Line          string `json:"line" bson:"line,omitempty"`
	Email    		string `json:"email" bson:"email,omitempty"`
}

type UserResponseFormat struct {
	StudentID       string `json:"student_id" bson:"student_id"`
	FirstName 		string `json:"first_name" bson:"first_name"`
	LastName  		string `json:"last_name" bson:"last_name"`
	NickName  		string `json:"nick_name" bson:"nick_name"`
	Year     		string `json:"year" bson:"year"`
	Major    		string `json:"major" bson:"major"`
	Role     		string `json:"role" bson:"role"`
	Image    		string `json:"image" bson:"image"`
	Telephone 		string `json:"telephone" bson:"telephone"`
	Instagram       string `json:"instagram" bson:"instagram"`
	Line          	string `json:"line" bson:"line"`
	Email   		string `json:"email" bson:"email"`
}