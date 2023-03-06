import { type HTMLElement } from "node-html-parser";

export interface UserInfo {
    userId: number;
    userFio?: string;
}

export function extractUser(node?: HTMLElement | null): UserInfo | undefined {
    if (node) {
        return {
            userId: parseInt(node?.getAttribute("axuiuserid") || ""),
            userFio: node?.querySelector("b, strong")?.rawText.trim(),
        };
    } else {
        return undefined;
    }
}
