import { getRsmSerchResult, type RsmSearchParams } from "../getRsmSearchResult/getRsmSerchResult.js";

export async function getRsmLivingSpaceByBtiUnom(rsmToken: string, btiUnom: number | number[]) {
    const searchParams: RsmSearchParams = {
        rsmToken,
        registerId: "KursLivingSpace",
        layoutId: 13530,
        query: { searchData: { FSLAST_BOOL: "true" }, dynamicControlData: { btiUnom } },
    };

    return await getRsmSerchResult(searchParams);
}
