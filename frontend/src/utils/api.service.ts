import axios from "axios";
import { ApiProperties } from "./api.properties";
import { ApiResponse, Application } from "./interfaces";

enum METHOD {
	GET,
	POST,
	DELETE,
	PUT,
	PATCH,
}

export const ApiService = {
	// Application Service Functions
	getApplications: () => {
		return apiRequest<Application>(
			ApiProperties.routes.getApplications,
			METHOD.GET
		);
	},

	addApplication: (data: Application) => {
		console.log("requested");
		apiRequest(ApiProperties.routes.addApplication, METHOD.POST, data);
	},

	deleteApplication: (data: Application) => {
		apiRequest(
			ApiProperties.routes.deleteApplication,
			METHOD.DELETE,
			undefined,
			data.app_id?.toString()
		);
	},
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
		headers: { "Content-Type": "application/json" },
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

const baseResponse = {data: { Message: "", data: [] }};
