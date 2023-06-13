export interface ApplicationFormInterface {
	user_id: Number;
	position: String;
	location: String;
	company: String;
	remote: Boolean;
	status: status;
	jd: String;
}

export enum status {
	"APPLIED",
	"REJECT",
	"OFFER",
	"INTERVIEW",
	"WISHLIST"
}