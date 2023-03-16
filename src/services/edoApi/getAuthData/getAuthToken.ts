import { edo } from "../lib/edoApi.js";

export async function getAuthToken(
    userId: number,
    password: string,
    dnsid: string | undefined,
): Promise<string | undefined> {
    try {
        const res = await edo.post(
            "/auth.php?group_id=21",
            {
                user_id: userId,
                password,
                DNSID: dnsid,
            },
            {
                maxRedirects: 0,
                validateStatus: (status) => status === 302,
            },
        );
        const re = /auth_token=(.*?);/i;
        return res?.headers["set-cookie"]?.[1]?.match(re)?.[1];
    } catch (e) {
        console.log(e);
        return undefined;
    }
}
