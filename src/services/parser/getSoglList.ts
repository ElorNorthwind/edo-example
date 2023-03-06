import { type HTMLElement } from "node-html-parser";
import { extractDate } from "./lib/extractDate.js";

export interface SoglUserInfo {
    name?: string;
    soglDate?: Date;
    soglStatus?: string;
}

export function getSoglList(node: HTMLElement): SoglUserInfo[] {
    const soglNodes = node.querySelector(".agreetable__tbody")?.querySelectorAll("tr");
    if (!soglNodes || soglNodes.length === 0) {
        return [{}];
    } else {
        return Array.from(soglNodes).map((e) => ({
            name: e.querySelectorAll("td")?.[1]?.rawText.trim(),
            soglDate: extractDate(e.querySelectorAll("td")?.[3]?.rawText),
            soglStatus: e.querySelectorAll("td")?.[3]?.rawText.match(/([а-я]+)/i)?.[1],
        }));
    }
}
