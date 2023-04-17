import axios, { type AxiosRequestConfig } from "axios";

export async function getRoomUniqueSessionKey(unom: number, rsmToken: string, silent: boolean = true): Promise<string> {
    const config: AxiosRequestConfig = {
        method: "get",
        maxBodyLength: Infinity,
        url: `http://webrsm.mlc.gov:5222/RegistersView/BtiRoom`,
        // url: `http://webrsm.mlc.gov:5222/RegistersView/BtiRoom?Transition=1&ShowOnlyGridWithToolbar=true&603200400=${unom}`,
        headers: {
            Cookie: `Rsm.Cookie=${rsmToken}`,
            "User-Agent":
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
        },
    };

    try {
        const response = await axios.request(config);
        const re = /UniqueSessionKey: "(.*)",/;
        if (!silent) {
            console.log(`session key: ${String(response?.data?.match(re)?.[1])}`);
        }
        return response?.data?.match(re)?.[1] || "";
    } catch (error) {
        console.log(error);
        return "";
    }
}
