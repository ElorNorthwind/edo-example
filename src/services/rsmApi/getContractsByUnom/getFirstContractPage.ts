import { type AxiosRequestConfig } from "axios";
// import { getControlDataByUnom } from "../lib/getControlDataByUnom.js";
import { formatSearchQueryString } from "../lib/formatSearchQueryString.js";
import { rsm } from "../lib/rsmApi.js";

export async function getFirstContractPage(
    unom: number | number[],
    sessionKey: string,
    rsmToken: string,
    layoutId: number = 10231,
): Promise<any[]> {
    const { search: searchParams } = formatSearchQueryString({ dynamicControlData: { unom } });
    const config: AxiosRequestConfig = {
        method: "get",
        maxBodyLength: Infinity,
        url: "/Registers/GetData",
        params: { UniqueSessionKey: sessionKey, RegisterId: "RdnContract", LayoutId: layoutId, ...searchParams },
        headers: {
            Cookie: `Rsm.Cookie=${rsmToken}`,
        },
    };

    try {
        // const response = await axios.request(config);
        const response = await rsm.request(config);
        return response?.data?.Data;
    } catch (error) {
        console.log(error);
        return [];
    }
}
