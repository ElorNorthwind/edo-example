import { getRoomUniqueSessionKey } from "./getRoomUniqueSessionKey.js";
import { getFirstRoomPage } from "./getFirstRoomPage.js";
import { getRoomCount } from "./getRoomCount.js";
import { getAddData } from "../lib/getAddData.js";

export interface roomBtiData {
    id: number; // 12602
    unom: number; // 12603
    unkv: number; // 12604
    npp: number; // 12605
    roomNum: string; // 12606
    realFloor: boolean; // 12614
    floorNum: number; // 12615
    s: number; // 12611
    sType: string; // 12610
    roomType: string; // 12607
    roomNz: string; // 12609
}

export async function getRoomList(unom: number, rsmToken: string, silent: boolean = true): Promise<roomBtiData[]> {
    const sessionKey = await getRoomUniqueSessionKey(unom, rsmToken);
    let [roomCount, resultArr] = await Promise.all([
        getRoomCount(unom, sessionKey, rsmToken),
        getFirstRoomPage(unom, sessionKey, rsmToken),
    ]);
    let checkMore = resultArr.length < roomCount;
    if (!silent) {
        console.log(`Unom: ${unom}, done: ${resultArr.length} of ${roomCount} rooms`);
    }
    do {
        const additionalData = await getAddData("BtiRoom", sessionKey, rsmToken);
        resultArr = [...resultArr, ...additionalData];
        if (!silent) {
            console.log(`Unom: ${unom}, done: ${resultArr.length} of ${roomCount} rooms`);
        }
        checkMore = resultArr.length < roomCount;
    } while (checkMore);
    return resultArr.map(roomInfoDto);
}

function roomInfoDto(room: any) {
    return {
        id: room?.["12602"] || 0,
        unom: room?.["12603"] || 0,
        unkv: room?.["12604"] || 0,
        npp: room?.["12605"] || 0,
        roomNum: room?.["12606"] || "",
        realFloor: room?.["12614"] === 1,
        floorNum: room?.["12615"] || 0,
        s: room?.["12611"] || 0,
        sType: room?.["12610"] || "",
        roomType: room?.["12607"] || "",
        roomNz: room?.["12609"] || "",
    };
}
