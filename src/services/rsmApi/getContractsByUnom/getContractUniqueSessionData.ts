import axios, { type AxiosRequestConfig } from "axios";

interface ContractSessionData {
    key: string;
    fields: Record<any, any>;
}

export async function getContractUniqueSessionData(
    rsmToken: string,
    layoutId: number = 10231,
    silent: boolean = true,
): Promise<ContractSessionData> {
    const config: AxiosRequestConfig = {
        method: "get",
        maxBodyLength: Infinity,
        url: `http://webrsm.mlc.gov:5222/RegistersView?LayoutId=${layoutId}&RegisterId=RdnContract`,
        headers: {
            Cookie: `Rsm.Cookie=${rsmToken}`,
            "User-Agent":
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
        },
    };

    try {
        const response = await axios.request(config);
        const sessionRe = /UniqueSessionKey: "(.*)",/;
        const sessionKey = String(response?.data?.match(sessionRe)?.[1] || "");

        const fieldsRe = /"columns":(\[.*\]),"pageable":/i;
        const fieldsData = JSON.parse(response?.data?.match(fieldsRe)?.[1]) || {};
        const fieldsList = fieldsData
            .filter((element: any) => element?.field && element?.title)
            .reduce(function (result: Record<string, string>, element: any, index: number) {
                result[String(element?.field.match(/(\d+)/i)?.[1]) || String(index)] = element?.title;
                return result;
            }, {});

        if (!silent) {
            console.log(`session key: ${sessionKey}`);
        }

        return { key: sessionKey, fields: fieldsList };
    } catch (error) {
        console.log(error);
        return { key: "", fields: {} };
    }
}
