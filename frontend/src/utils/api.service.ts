import axios from "axios";
import { ApiProperties } from "./api.properties";
import { ApiResponse, Application } from "./interfaces";

enum METHOD {
	GET,
	POST,
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
		console.log("requested")
		apiRequest(ApiProperties.routes.addApplication, METHOD.POST, data);
	},

	deleteApplication: (data: Application) => {
		apiRequest(ApiProperties.routes.deleteApplication, METHOD.POST, {
			app_id: data.app_id,
		});
	},
};

const constructURL = (endpoint: String) => {
	const host = ApiProperties.host;
	const port = ApiProperties.port;

	return `http://${host}:${port}${endpoint}`;
};

const apiRequest = async <T>(
	endpoint: String,
	method: METHOD,
	params?: Object
) => {
	const url = constructURL(endpoint);
	const options = {
		headers: { "Content-Type": "application/json" },
	};
	let response: ApiResponse<T> = baseResponse;
	if (method === METHOD.POST) {
		response = await axios.post(url, params, options);
	} else {
		response = await axios.get(url);
	}

	return response;
};

const baseResponse = { message: "", data: [] };
