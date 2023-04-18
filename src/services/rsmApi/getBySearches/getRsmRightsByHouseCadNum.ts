import { getRsmSerchResult, type RsmSearchParams } from "../getRsmSearchResult/getRsmSerchResult.js";

export async function getRsmRightsByHouseCadNum(rsmToken: string, houseCadNum: string) {
    const searchParams: RsmSearchParams = {
        rsmToken,
        registerId: "CityRight",
        layoutId: 11753,
        query: { searchDataNewDesign: { houseCadastrNum: houseCadNum, subjectTypeOther: true } },
    };

    return await getRsmSerchResult(searchParams);
}
