export interface Application {
	app_id?: Number;
	user_id?: Number;
	position: String;
	location: String;
	company: String;
	remote: Boolean;
	status: status;
	jd: String;
}

export interface ApiResponse<T> {
	message: String;
	data: T | T[];
}

export enum status {
	"APPLIED",
	"REJECT",
	"OFFER",
	"INTERVIEW",
	"WISHLIST",
}
