import axios, { type AxiosRequestConfig } from "axios";

export async function getRsmSessionCookies(): Promise<string> {
    const config: AxiosRequestConfig = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://sudir.mos.ru/blitz/oauth/ae?response_type=code&client_id=webrsm.mlc.gov&redirect_uri=http://webrsm.mlc.gov:5222/Sudir/Auth&scope=openid+profile",
        headers: {
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "user-agent":
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
        },
        maxRedirects: 0,
        validateStatus: (status) => status === 303,
    };

    try {
        const response = await axios.request(config);
        const cookiesList = response?.headers?.["set-cookie"]?.map((header) => header.split(";")[0]);
        return cookiesList?.join("; ") || "";
    } catch (error) {
        console.log(error);
        return "";
    }
}
