import { type HTMLElement } from "node-html-parser";
import { extractDate } from "./extractDate.js";

export interface DocLink {
    docID: number;
    linkedOrg?: string;
    num?: string;
    date?: Date;
}

export function extractDocLink(node: HTMLElement): DocLink | undefined {
    const linkText = node.getAttribute("href");
    const idRegex = /id=([\d]+)/i;
    const orgRegex = /linked_org=([\d]+)/i;
    const numRegex = / *(.*?)(?:&nbsp;| )*(?:от|$)/i;

    if (node) {
        return {
            docID: parseInt(linkText?.match(idRegex)?.[1] || ""), // NaN for undefined \ nullish
            linkedOrg: linkText?.match(orgRegex)?.[1],
            num: node.rawText.match(numRegex)?.[1],
            date: extractDate(node.querySelector(".document-badge__date")?.rawText), // нехорошо, лишняя связанность. Антипаттерн...
        };
    } else {
        return undefined;
    }
}
