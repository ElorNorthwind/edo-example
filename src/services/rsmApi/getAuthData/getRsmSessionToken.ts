import axios, { type AxiosRequestConfig } from "axios";

export async function getRsmSessionToken(loginLink: string, silent: boolean = true): Promise<string> {
    const config: AxiosRequestConfig = {
        method: "get",
        maxBodyLength: Infinity,
        url: loginLink,
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
        },
        maxRedirects: 0,
        validateStatus: (status) => status === 302,
    };

    try {
        const response = await axios.request(config);
        const re = /Rsm\.Cookie=(.*?);/;
        if (!silent) {
            console.log(`rsm.cookie: ${String(response?.headers?.["set-cookie"]?.join("; ").match(re)?.[1])}`);
        }
        return response?.headers?.["set-cookie"]?.join("; ").match(re)?.[1] || "";
    } catch (error) {
        console.log(error);
        return "";
    }
}
