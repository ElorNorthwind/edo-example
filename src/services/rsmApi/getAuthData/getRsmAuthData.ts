import { getRsmSessionCookies } from "./getRsmSessionCookies.js";
import { getRsmSessionToken } from "./getRsmSessionToken.js";
import { getRsmLoginLink } from "./getRsmLoginLink.js";

export async function getRsmAuthData(login: string, password: string): Promise<string> {
    const sessionCookies = await getRsmSessionCookies();
    const loginLink = await getRsmLoginLink(login, password, sessionCookies);
    const sessionToken = await getRsmSessionToken(loginLink);
    return sessionToken;
}
