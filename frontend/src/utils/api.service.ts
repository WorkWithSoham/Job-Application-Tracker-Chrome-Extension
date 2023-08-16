import axios, {AxiosInstance} from "axios";
import {ApiProperties} from "./api.properties";
import {ApiRequestData, ApiResponse, Application, User} from "./interfaces";
import {Utils} from "./utils";

enum METHOD {
    GET,
    POST,
    DELETE,
    PUT,
    PATCH,
}

let jwt = window.localStorage.getItem(Utils.TOKEN_STORAGE_KEY) ?? ""

export const ApiService = {
    // Application Service Functions
    getApplications: async () => {
        return await apiRequest<Application>(
            ApiProperties.routes.getApplications,
            METHOD.GET
        )
    },

    addApplication: async (app: Application) => {
        const apiRequestData: ApiRequestData<Application> = {
            entity: app
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
            entity: user
        }
        const response: ApiResponse<User> = await apiRequest(ApiProperties.routes.addUser, METHOD.POST, apiRequestData);
        if (jwt === undefined || jwt === "") {
            const newToken = response.data?.data?.token ?? ""
            window.localStorage.setItem(Utils.TOKEN_STORAGE_KEY, newToken)
            jwt = newToken;
        }
        return response
    },

    loginUser: async (user: User) => {
        const apiRequestData: ApiRequestData<User> = {
            entity: user,
            token: jwt
        }
        const response: ApiResponse<User> = await apiRequest(ApiProperties.routes.loginUser, METHOD.POST, apiRequestData)
        console.log(response)
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

    let instance: AxiosInstance = axios.create();
    const httpOptions = {
        headers: {
            Authorization: Utils.REACT_APP_API_KEY
        },
    };

    let url: string = "";

    if (pathVar !== undefined) {
        url = constructURL(endpoint, pathVar);
    } else {
        url = constructURL(endpoint);
    }

    try {
        if (method === METHOD.POST) {
            response = await instance.post(url, params, httpOptions);
        } else if (method === METHOD.GET) {
            response = await instance.get(url, httpOptions);
        } else if (method === METHOD.DELETE) {
            response = await instance.delete(url, httpOptions);
        }
    } catch (error: any) {
        return {
            error: {
                code: error.code,
                msg: error.msg
            }
        };
    }

    return response;
};

const baseResponse = {data: {msg: "", data: {entity: []}}};
