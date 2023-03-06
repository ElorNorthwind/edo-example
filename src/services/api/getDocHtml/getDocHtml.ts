import { edo } from "../lib/edoApi.js";
import { type AuthData } from "../getAuthData/getAuthData.js";

export async function getDocHtml(id: string, authData: AuthData) {
    try {
        const { dnsid, authToken } = authData;
        if (!dnsid || !authToken) {
            throw new Error("Ошибка авторизации!");
        }
        const res = await edo.get("/document.card.php", {
            params: { id, DNSID: dnsid },
            withCredentials: true,
            responseType: "arraybuffer",
            responseEncoding: "binary",
            headers: {
                cookie: `auth_token=${authToken};`,
            },
        });

        if (res.request?.res?.responseUrl?.includes("auth.php")) {
            throw new Error("Ошибка авторизации!");
        }

        return res.data;
    } catch (e) {
        console.log(e);
        return null;
    }
}
