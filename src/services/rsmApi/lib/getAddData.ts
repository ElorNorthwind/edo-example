import { type AxiosRequestConfig } from "axios";
import { rsm } from "./rsmApi.js";

export async function getAddData(registerId: string, uniqueSessionKey: string, rsmToken: string): Promise<any[]> {
    const config: AxiosRequestConfig = {
        url: `/Registers/GetAddData`,
        params: { registerId, uniqueSessionKey },
        headers: {
            Cookie: `Rsm.Cookie=${rsmToken}`,
        },
    };

    try {
        const response = await rsm.request(config);
        return response?.data?.Data || [];
    } catch (error) {
        console.log(error);
        return [];
    }
}
