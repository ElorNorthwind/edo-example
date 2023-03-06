import { edo } from "../lib/edoApi.js";
import { parse } from "node-html-parser";

export async function getDnsid(): Promise<string | undefined> {
    try {
        const res = await edo.get("/");
        const root = parse(res.data);
        return root.querySelector("input[name='DNSID']")?.getAttribute("value");
    } catch (e) {
        console.log(e);
        return undefined;
    }
}
