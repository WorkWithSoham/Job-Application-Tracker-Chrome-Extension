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

export interface User {
    user_id?: Number;
    full_name?: string;
    username?: string;
    email: string;
    password?: string;
}

export interface ApiRequestData<T> {
    entity: T;
    token?: string
}

export interface ApiResponse<T> {
    data?: {
        msg: String;
        data?: {
            entity: T | T[];
            token?: string;
        };
    };
    error?: {
        code: string;
        msg: string;
    }
}

export interface InternalMessage<T> {
    msg: string;
    url: string;
    data?: T
}

export enum status {
    "APPLIED",
    "REJECT",
    "OFFER",
    "INTERVIEW",
    "WISHLIST",
}
