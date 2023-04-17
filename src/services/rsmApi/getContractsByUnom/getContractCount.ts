import { type AxiosRequestConfig } from "axios";
import { rsm } from "../lib/rsmApi.js";
import { formatSearchQueryString } from "../lib/formatSearchQueryString.js";

export async function getContractCount(
    unom: number | number[],
    sessionKey: string,
    rsmToken: string,
    layoutId: number = 10231,
): Promise<number> {
    const { count: searchParams } = formatSearchQueryString({ dynamicControlData: { unom } });
    const parametersJson = JSON.stringify({
        RegisterId: "RdnContract",
        LayoutId: layoutId,
        // CurrentLayoutId: layoutId,
        // UniqueSessionKey: sessionKey,
        ...searchParams,
    });

    const config: AxiosRequestConfig = {
        method: "get",
        maxBodyLength: Infinity,
        url: `/Registers/GetCount`,
        params: { registerId: "RdnContract", UniqueSessionKey: sessionKey, parametersJson },
        headers: {
            Cookie: `Rsm.Cookie=${rsmToken}`,
        },
    };

    try {
        const response = await rsm.request(config);
        return response?.data | 0;
    } catch (error) {
        console.log(error);
        return 0;
    }
}
