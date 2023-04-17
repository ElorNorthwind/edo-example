import axios, { type AxiosRequestConfig } from "axios";
import { getControlDataByUnom } from "../lib/getControlDataByUnom.js";

export async function getContractCount(
    unom: number | number[],
    sessionKey: string,
    rsmToken: string,
    layoutId: number = 10231,
): Promise<number> {
    // [{\"IdControl\":\"Unom\",\"StringValue\":\"88\",\"ControlType\":\"DynamicNumber\",\"QueryOperation\":\"list\",\"IdAttribute\":\"45100200\"},{\"IdControl\":\"Unom\",\"StringValue\":\"89\",\"ControlType\":\"DynamicNumber\",\"QueryOperation\":\"list\",\"IdAttribute\":\"45100200\"}]
    const queryString = getControlDataByUnom(unom, true);
    const fullParams = encodeURIComponent(
        `{"RegisterId":"RdnContract","LayoutId":"${layoutId}","SearchDynamicControlData":"${queryString}","databaseFilters":[],"selectedLists":[],"UniqueSessionKey":"${sessionKey}","UniqueSessionKeySetManually":true,"ContentLoadCounter":1,"CurrentLayoutId":"${layoutId}"}`,
    );
    const url = `http://webrsm.mlc.gov:5222/Registers/GetCount?parametersJson=${fullParams}&registerId=RdnContract&uniqueSessionKey=${sessionKey}`;

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
