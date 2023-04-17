import { type AxiosRequestConfig } from "axios";
import { rsm } from "../lib/rsmApi.js";
import { formatSearchQueryString } from "../lib/formatSearchQueryString.js";
import { getAddData } from "../lib/getAddData.js";
import { type RsmSearchData, type RsmSearchParams } from "./getRsmSerchResult.js";

interface RsmDataSearchParams extends RsmSearchParams {
    sessionKey: string;
}

export async function getRsmSearchData(params: RsmDataSearchParams): Promise<RsmSearchData> {
    const { sessionKey, rsmToken, registerId, layoutId, query } = params;
    const { search, count } = formatSearchQueryString(query);

    // Собираем строку для волженых параметров (используется в запросе на количество найденых записей)
    const parametersJson = JSON.stringify({
        RegisterId: registerId,
        LayoutId: layoutId,
        ...count,
    });

    // Общие параметры запроса
    const config: AxiosRequestConfig = {
        method: "get",
        maxBodyLength: Infinity,
        headers: {
            Cookie: `Rsm.Cookie=${rsmToken}`,
        },
    };

    // Параметры запроса на подсчёт количества найденых записей
    const countConfig: AxiosRequestConfig = {
        url: `/Registers/GetCount`,
        params: { registerId, UniqueSessionKey: sessionKey, LayoutId: layoutId, parametersJson },
        ...config,
    };

    // Параметры запроса на получение первой страницы результатов
    const searchConfig: AxiosRequestConfig = {
        url: "/Registers/GetData",
        params: { UniqueSessionKey: sessionKey, RegisterId: registerId, LayoutId: layoutId, ...search },
        ...config,
    };

    try {
        // Отправляем парарельные запросы на получение первой страницвы данных и общего числа найденых записей
        const initialResponses = await Promise.all([rsm.request(countConfig), rsm.request(searchConfig)]);
        const count = initialResponses[0]?.data || 0;
        let data = initialResponses[1]?.data?.Data || [];

        // Догружаем оставшиеся станицы, пока число полученных записей не станет равно их общему количеству
        do {
            const additionalData = await getAddData(registerId, sessionKey, rsmToken);
            data = [...data, ...additionalData];
        } while (data.length < count);

        // возвращаем объект с данными
        return { data, count, error: false };
    } catch (error) {
        console.log(error);

        // возвращаем пустой объект с пометкой об ошибке
        return { data: [], count: 0, error: true };
    }
}
