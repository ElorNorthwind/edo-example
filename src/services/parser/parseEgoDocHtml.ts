import { type AxiosResponse } from "axios";
import { type HTMLElement, parse } from "node-html-parser";
import { getSoglList } from "./getSoglList.js";
import { extractDate } from "./lib/extractDate.js";
import { type DocLink, extractDocLink } from "./lib/extractDocLink.js";
import { extractUser, type UserInfo } from "./lib/extractUser.js";

export function parseDocHtml(html: AxiosResponse["data"]) {
    const decoder = new TextDecoder("windows-1251");
    const root = parse(decoder.decode(html)).removeWhitespace();

    return {
        soglList: getSoglList(root), // нужен рефактор
        outDocNum: getDocNum(root),
        outDocDate: getDocDate(root),
        inDocNum: getInDocNum(root),
        inDocDate: getInDocDate(root),
        signator: getDocSignator(root),
        author: getDocAuthor(root),
        summary: getSummary(root),
        linkList: getLinkList(root),
        inReplyToList: getInReplyToList(root),
        myOrgLinks: getMyOrgLinks(root),
        projectLinks: getProjectLinks(root),
        docResepient: getDocResepient(root),
    };
}

// исходящий номер документа
function getDocNum(node: HTMLElement): string | undefined {
    return node?.querySelector("[class^='b'][data-tour='12']")?.rawText;
}

// исходящий дата документа
function getDocDate(node: HTMLElement): Date | undefined {
    const datestr = node?.querySelector("[class^='b'][data-tour='13']")?.rawText;
    return extractDate(datestr);
}

// входящий номер документа
function getInDocNum(node: HTMLElement): string | undefined {
    return node?.querySelector("[class^='b'][data-tour='1']")?.rawText;
}

// входящий дата документа
function getInDocDate(node: HTMLElement): Date | undefined {
    const datestr = node?.querySelector("[class^='b'][data-tour='2']")?.rawText;
    return extractDate(datestr);
}

// подписант документа (от кого)
function getDocSignator(node: HTMLElement): UserInfo | undefined {
    const userNode = node?.querySelector("[class^='b'][data-tour='14'] > span");
    if (!userNode) {
        return undefined;
    }
    return extractUser(userNode);
}

// получатели документа (кому)
function getDocResepient(node: HTMLElement): Array<UserInfo | undefined> {
    const titleNodes = node.querySelectorAll(".titles");
    const resepientList = Array.from(titleNodes)
        .filter((titleNode) => /кому:/i.test(titleNode.rawText) && titleNode.nextSibling)
        .map((titleNode) => {
            const userNode = titleNode.nextSibling as HTMLElement;
            return extractUser(userNode.querySelector("span"));
        });
    return resepientList;
}

// исполнитель документа
function getDocAuthor(node: HTMLElement): UserInfo | undefined {
    const userNode = node.querySelector("[class^='b'][data-tour='15'] > span");
    return extractUser(userNode);
}

// на документ ссылаются
function getLinkList(node: HTMLElement): Array<DocLink | undefined> | undefined {
    const links = node.querySelectorAll("#linkList a");
    if (links.length === 0) {
        return undefined;
    } else {
        return Array.from(links).map((e) => extractDocLink(e));
    }
}

// в ответ на номер
function getInReplyToList(node: HTMLElement): Array<DocLink | undefined> | undefined {
    const links = node.querySelectorAll("[class^='b'][data-tour='5'] a");
    if (!links || links.length === 0) {
        return undefined;
    } else {
        return Array.from(links).map((e) => extractDocLink(e));
    }
}

// связки моей организации
function getMyOrgLinks(node: HTMLElement): Array<DocLink | undefined> | undefined {
    const links = node.querySelectorAll("[class^='b'][data-tour='6'] a");
    if (!links || links.length === 0) {
        return undefined;
    } else {
        return Array.from(links).map((e) => extractDocLink(e));
    }
}

// проектная работа
function getProjectLinks(node: HTMLElement): Array<DocLink | undefined> | undefined {
    const linksNode = Array.from(node.querySelectorAll(".titles")).find((titleNode) =>
        /проектная работа:/i.test(titleNode.rawText),
    )?.nextSibling as HTMLElement;
    const links = linksNode?.querySelectorAll("a");

    if (!links || links.length === 0) {
        return undefined;
    } else {
        return Array.from(links).map((e) => extractDocLink(e));
    }
}

// номер документа
function getSummary(node: HTMLElement): string | undefined {
    return node.querySelector("[class^='b'][data-tour='20']")?.rawText.trim();
}
