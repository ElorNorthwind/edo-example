import { getRsmSerchResult, type RsmSearchParams } from "../getRsmSearchResult/getRsmSerchResult.js";

export async function getRsmContractsByUnom(rsmToken: string, unom: number | number[]) {
    const searchParams: RsmSearchParams = {
        rsmToken,
        registerId: "RdnContract",
        layoutId: 10231,
        query: { dynamicControlData: { unom } },
    };

    return await getRsmSerchResult(searchParams);
}
