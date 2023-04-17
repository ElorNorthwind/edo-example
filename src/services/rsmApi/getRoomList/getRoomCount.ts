import axios, { type AxiosRequestConfig } from "axios";

export async function getRoomCount(unom: number, sessionKey: string, rsmToken: string): Promise<number> {
    const queryString = encodeURIComponent(
        `{"603200400":"${unom}","RegisterId":"BtiRoom","isTransition":true,"transitionQueryString":"?Transition=1&ShowOnlyGridWithToolbar=true&603200400=${unom}","UniqueSessionKey":"${sessionKey}","UniqueSessionKeySetManually":true,"Transition":"1","ShowOnlyGridWithToolbar":"true","ContentLoadCounter":1,"CurrentLayoutId":"6032001"}`,
    );
    const url = `http://webrsm.mlc.gov:5222/Registers/GetCount?parametersJson=${queryString}&registerId=BtiRoom&uniqueSessionKey=${sessionKey}`;

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
        return response?.data | 0;
    } catch (error) {
        console.log(error);
        return 0;
    }
}
