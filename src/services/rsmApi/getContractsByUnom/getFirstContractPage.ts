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

    // const searchString = encodeURIComponent(getControlDataByUnom(unom, false));

    // const url = `http://webrsm.mlc.gov:5222/Registers/GetData?RegisterId=RdnContract&LayoutId=${layoutId}&SearchDynamicControlData=${searchString}&UniqueSessionKey=${sessionKey}&UniqueSessionKeySetManually=true`;

    // const config: AxiosRequestConfig = {
    //     method: "get",
    //     maxBodyLength: Infinity,
    //     url,
    //     headers: {
    //         Cookie: `Rsm.Cookie=${rsmToken}`,
    //         "User-Agent":
    //             "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
    //     },
    // };

    try {
        // const response = await axios.request(config);
        const response = await rsm.request(config);
        return response?.data?.Data;
    } catch (error) {
        console.log(error);
        return [];
    }
}
