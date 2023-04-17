import { getContractUniqueSessionData } from "./getContractUniqueSessionData.js";
import { getFirstContractPage } from "./getFirstContractPage.js";
import { getContractCount } from "./getContractCount.js";
import { getAddData } from "../lib/getAddData.js";

export async function getContractsByUnom(
    unom: number | number[],
    rsmToken: string,
    options?: {
        layoutId?: number;
        readableNames?: boolean;
        silent?: boolean;
    },
): Promise<any[]> {
    const { layoutId = 10231, readableNames = true, silent = true } = options || {};
    const { key: sessionKey, fields } = await getContractUniqueSessionData(rsmToken, layoutId, silent);
    let [contractCount, resultArr] = await Promise.all([
        getContractCount(unom, sessionKey, rsmToken),
        getFirstContractPage(unom, sessionKey, rsmToken),
    ]);
    let checkMore = resultArr.length < contractCount;
    if (!silent) {
        console.log(`Unom: ${JSON.stringify(unom)}, done: ${resultArr.length} of ${contractCount} contracts`);
    }
    do {
        const additionalData = await getAddData("RdnContrac", sessionKey, rsmToken);
        resultArr = [...resultArr, ...additionalData];
        if (!silent) {
            console.log(`Unom: ${JSON.stringify(unom)}, done: ${resultArr.length} of ${contractCount} contracts`);
        }
        checkMore = resultArr.length < contractCount;
    } while (checkMore);

    if (readableNames && Object.keys(fields).length > 0) {
        const readableNamesKeys = (contract: any) => {
            return Object.keys(contract).reduce(function (result: any, key) {
                result[fields[key] || key] = contract[key];
                return result;
            }, {});
        };

        return resultArr.map(readableNamesKeys);
    } else {
        return resultArr;
    }
}
