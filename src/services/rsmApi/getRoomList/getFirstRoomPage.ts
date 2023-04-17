import axios, { type AxiosRequestConfig } from "axios";

export async function getFirstRoomPage(unom: number, sessionKey: string, rsmToken: string): Promise<any[]> {
    const queryString = encodeURIComponent(`?Transition=1&ShowOnlyGridWithToolbar=true&603200400=${unom}`);
    const url = `http://webrsm.mlc.gov:5222/Registers/GetData?603200400=${unom}&RegisterId=BtiRoom&isTransition=true&transitionQueryString=${queryString}&UniqueSessionKey=${sessionKey}`;
    const config: AxiosRequestConfig = {
        method: "get",
        maxBodyLength: Infinity,
        url,
        headers: {
            Cookie: `Rsm.Cookie=${rsmToken}`,
            "User-Agent":
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
        },
    };

    try {
        const response = await axios.request(config);
        // проверить что пришел верный UNOM
        if (response?.data?.Data?.[0]["12603"] !== unom) {
            throw new Error("query returnted wrong UNOM");
        }
        return response?.data?.Data;
    } catch (error) {
        console.log(error);
        return [];
    }
}
