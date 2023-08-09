import axios from "axios";
import {ApiProperties} from "./api.properties";
import {ApiRequestData, ApiResponse, Application, User} from "./interfaces";

enum METHOD {
    GET,
    POST,
    DELETE,
    PUT,
    PATCH,
}

let jwt = window.localStorage.getItem(`${process.env.TOKEN_KEY}`) ?? ""

export const ApiService = {
    // Application Service Functions
    getApplications: async () => {
        const response: ApiResponse<Application> = await apiRequest<Application>(
            ApiProperties.routes.getApplications,
            METHOD.GET
        );

        return response
    },

    addApplication: async (app: Application) => {
        const apiRequestData: ApiRequestData<Application> = {
            data: app
        }
        const response: ApiResponse<Application> = await apiRequest(ApiProperties.routes.addApplication, METHOD.POST, apiRequestData);

        return response
    },

    deleteApplication: async (app: Application) => {
        const response: ApiResponse<Application> = await apiRequest(
            ApiProperties.routes.deleteApplication,
            METHOD.DELETE,
            undefined,
            app.app_id?.toString()
        );

        return response
    },

    // User service functions
    addUser: async (user: User) => {
        const apiRequestData: ApiRequestData<User> = {
            data: user
        }
        const response: ApiResponse<User> = await apiRequest(ApiProperties.routes.addUser, METHOD.POST, apiRequestData);
        if (jwt === undefined || jwt === "") {
            const newToken = response.data.data?.token ?? ""
            window.localStorage.setItem(`${process.env.TOKEN_KEY}`, newToken)
            jwt = newToken;
        }
        return response
    },

    loginUser: async (user: User) => {
        const apiRequestData: ApiRequestData<User> = {
            data: user,
            token: jwt
        }
        const response: ApiResponse<User> = await apiRequest(ApiProperties.routes.loginUser, METHOD.POST, apiRequestData)

        return response.data
    }
};

const constructURL = (endpoint: String, pathVar?: String | Number) => {
    const host = ApiProperties.host;
    const port = ApiProperties.port;
    if (pathVar === undefined) {
        return `http://${host}:${port}${endpoint}`;
    } else {
        return `http://${host}:${port}${endpoint}/${pathVar}`;
    }
};

const apiRequest = async <T>(
    endpoint: String,
    method: METHOD,
    params?: Object,
    pathVar?: String
) => {
    let response: ApiResponse<T> = baseResponse;
    const options = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer${process.env.REACT_APP_API_KEY}`
        },
    };
    var url = "";

    if (pathVar !== undefined) {
        url = constructURL(endpoint, pathVar);
    } else {
        url = constructURL(endpoint);
    }

    if (method === METHOD.POST) {
        response = await axios.post(url, params, options);
    } else if (method === METHOD.GET) {
        response = await axios.get(url);
    } else if (method === METHOD.DELETE) {
        response = await axios.delete(url);
    }

    return response;
};

const baseResponse = {data: {msg: "", data: {entity: []}}};
