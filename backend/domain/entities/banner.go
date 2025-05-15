package entities

type BannerDataFormat struct {
	BannerName string `json:"banner_name" bson:"banner_name,omitempty"`;
	Image string `json:"image" bson:"image,omitempty"`;
}