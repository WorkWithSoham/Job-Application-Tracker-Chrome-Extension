export interface Application {
	app_id?: Number;
	user_id?: Number;
	position: string;
	location: string;
	company: string;
	remote: Boolean;
	status: status;
	app_date?: string;
	jd: string;
}

export interface ApiResponse<T> {
	data: {
		Message: String;
		data: T | T[];
	};
}

export enum status {
	"APPLIED",
	"REJECT",
	"OFFER",
	"INTERVIEW",
	"WISHLIST",
}
