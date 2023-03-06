import { getDnsid } from "./getDnsid.js";
import { getAuthToken } from "./getAuthToken.js";

export interface AuthData {
    dnsid: string | undefined;
    authToken: string | undefined;
}

export async function getAuthData(userId: number, password: string): Promise<AuthData> {
    const dnsid = await getDnsid();
    if (!dnsid) {
        return { dnsid: undefined, authToken: undefined };
    }
    const authToken = await getAuthToken(userId, password, dnsid);
    return { dnsid, authToken };
}
