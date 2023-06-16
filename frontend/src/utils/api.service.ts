import axios from "axios";
import { ApiProperties } from "./api.properties";
import { ApiResponse, Application } from "./interfaces";

export const ApiService = {
	// Application Service Functions
	getApplications: () => {
		return apiRequest<Application>(ApiProperties.routes.getApplications);
	},

	addApplication: (data: Application) => {
		apiRequest(ApiProperties.routes.addApplication, data);
	},
};

const constructURL = (endpoint: String) => {
	const host = ApiProperties.host;
	const port = ApiProperties.port;

	return `http://${host}:${port}${endpoint}`;
};

const apiRequest = async <T> (endpoint: String, params?: Object) => {
	const url = constructURL(endpoint);
	let response: ApiResponse<T> = baseResponse;
	if (params) {
		response = await axios.post(url, params);
	} else {
		response = await axios.get(url);
	}

	return response;
};

const baseResponse = { message: "", data: [] }