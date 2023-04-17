import { type RsmSearchQuery } from "../lib/formatSearchQueryString.js";
import { getRsmSessionData } from "../lib/getSessionData.js";
import { getRsmSearchData } from "./getRsmSearchData.js";

export interface RsmSearchParams {
    rsmToken: string;
    registerId: string;
    layoutId: number;
    query: RsmSearchQuery;
}

export interface RsmSearchData {
    data: any[];
    count: number;
    error: boolean;
}

export async function getRsmSerchResult(params: RsmSearchParams): Promise<RsmSearchData> {
    const { rsmToken, registerId, layoutId, query } = params;

    // Данные сессии: ее уникальный ID и рекордсэт, соотносящий номера полей с из нахваниями
    const { key: sessionKey, fields } = await getRsmSessionData({ rsmToken, registerId, layoutId });

    // Получаем информацию по запросу
    const rawData = await getRsmSearchData({ sessionKey, rsmToken, registerId, layoutId, query });

    // Меняем объект с числовыми ключами на объект с ключами в виде названий полей поиска в РСМ 2.0
    const readableNamesKeys = (dataRow: Record<string, string>) => {
        return Object.keys(dataRow).reduce(function (result: any, key) {
            result[fields[key] || key] = dataRow[key];
            return result;
        }, {});
    };

    // Возвращаем те же данные, но с человекочитаемыми ключами
    return { ...rawData, data: rawData.data.map(readableNamesKeys) };
}
