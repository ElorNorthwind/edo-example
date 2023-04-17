import axios, { type AxiosRequestConfig } from "axios";
import qs from "qs";

export async function getRsmLoginLink(login: string, password: string, sessionCookies: string): Promise<string> {
    const data = qs.stringify({
        login, // "HQ\\ShepelevSA"
        password, // "!141605lorans"
    });

    const config: AxiosRequestConfig = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://sudir.mos.ru/blitz/login/methods/password?bo=%2Fblitz%2Foauth%2Fae%3Fresponse_type%3Dcode%26client_id%3Dwebrsm.mlc.gov%26redirect_uri%3Dhttp%3A%2F%2Fwebrsm.mlc.gov%3A5222%2FSudir%2FAuth%26scope%3Dopenid%2Bprofile",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            cookie: sessionCookies,
            "user-agent":
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
        },
        data,
        maxRedirects: 0,
        validateStatus: (status) => status === 302,
    };

    try {
        const response = await axios.request(config);
        return response?.headers?.location || "";
    } catch (error) {
        console.log(error);
        return "";
    }
}
