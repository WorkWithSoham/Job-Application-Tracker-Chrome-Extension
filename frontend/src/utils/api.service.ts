import { Type } from "typescript"
import { ApiProperties } from "./api.properties"
import { ApplicationFormInterface } from "./interfaces"
import axios from "axios"

export const ApiService = {
    addApplication: (data: ApplicationFormInterface) => {
        apiRequest(data, ApiProperties.routes.addApplication)
    }
}

const constructURL = (endpoint: String) => {
    const host = ApiProperties.host
    const port = ApiProperties.port

    return `http://${host}:${port}${endpoint}`
}

const apiRequest = async (data: Object, endpoint: String) => {
    const url = constructURL(endpoint);
    const response = await axios.post(url, data)
    console.log(response.data)
}
