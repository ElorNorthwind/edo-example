import { type AxiosRequestConfig } from "axios";
import { rsm } from "./rsmApi.js";

interface ContractSessionData {
    key: string;
    fields: Record<any, any>;
}

interface RsmSessionDataParams {
    rsmToken: string;
    registerId: string;
    layoutId: number;
}

export async function getRsmSessionData(params: RsmSessionDataParams): Promise<ContractSessionData> {
    const { rsmToken, registerId: register, layoutId: layout } = params;
    const config: AxiosRequestConfig = {
        method: "get",
        maxBodyLength: Infinity,
        url: `/RegistersView`,
        params: {
            RegisterId: register,
            LayoutId: layout,
        },
        headers: {
            Cookie: `Rsm.Cookie=${rsmToken}`,
        },
    };

    try {
        const response = await rsm.request(config);
        const sessionRe = /UniqueSessionKey: "(.*)",/;
        const sessionKey = String(response?.data?.match(sessionRe)?.[1] || "");

        const fieldsRe = /"columns":(\[.*\]),"pageable":/i;
        const fieldsData = JSON.parse(response?.data?.match(fieldsRe)?.[1]) || {};
        const fieldsList = fieldsData
            .filter((element: any) => element?.field && element?.title)
            .reduce(function (result: Record<string, string>, element: any, index: number) {
                const fieldName = String(element?.field.match(/(\d+)/i)?.[1]) || String(index);
                result[fieldName] = element?.title;
                return result;
            }, {});

        return { key: sessionKey, fields: fieldsList };
    } catch (error) {
        console.log(error);
        return { key: "", fields: {} };
    }
}
