import axios from "axios";

export const httpClient = axios.create({
    /* baseURL: "http://localhost:5088/api/v1", */
    baseURL: "https://distrib2223app.azurewebsites.net/api/v1",
    headers: {
        "Content-type": "application/json"
    }
});

export default httpClient;
