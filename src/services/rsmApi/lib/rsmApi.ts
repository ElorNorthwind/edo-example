import axios, { type AxiosInstance } from "axios";

// Set config defaults when creating the instance
export const rsm: AxiosInstance = axios.create({
    baseURL: "http://webrsm.mlc.gov:5222",
    headers: {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
    },
});
