// import { type AuthData, getAuthData } from "./services/edoApi/getAuthData/getAuthData.js";
// import { getDocHtml } from "./services/edoApi/getDocHtml/getDocHtml.js";
// import { parseDocHtml } from "./services/parser/parseEgoDocHtml.js";
import fs from "fs";
import * as dotenv from "dotenv";
import { getRsmAuthData } from "./services/rsmApi/getAuthData/getRsmAuthData.js";
import { getContractsByUnom } from "./services/rsmApi/getContractsByUnom/getContractsByUnom.js";
import { getRoomList } from "./services/rsmApi/getRoomList/getRoomList.js";
// import { getFirstContractPage } from "./services/rsmApi/getContractSearchResult/getFirstContractPage.js";

dotenv.config();

// // testing testing 123
// async function saveDocHTML(id: string, authData: AuthData, resultArr: any[]) {
//     try {
//         const doc = await getDocHtml(id, authData);

//         resultArr.push(parseDocHtml(doc));
//     } catch (e) {
//         console.log(e);
//     }
// }

// async function wrightAllToFile() {
//     const resultArr: any[] = [];
//     const docList = ["489473013", "490332402", "491065535"];
//     const loginData = {
//         userId: Number(process.env.EDO_USERID) || 0,
//         password: process.env.EDO_PASSWORD || "",
//     };

//     const authData = await getAuthData(loginData.userId, loginData.password);

//     await Promise.all(
//         docList.map(async (doc) => {
//             await saveDocHTML(doc, authData, resultArr);
//         }),
//     );

//     if (resultArr) {
//         fs.writeFile("./test_output/result.json", JSON.stringify(resultArr), function (err) {
//             if (err) {
//                 console.log(err);
//                 return;
//             }
//             console.log("The file was saved!");
//         });
//     }
// }

// wrightAllToFile().catch((e) => {
//     console.log(e);
// });

// getRsmAuthData("HQ\\ShepelevSA", "!141605lorans").catch((e) => {
//     console.log(e);
// });

async function test() {
    const rsmToken = await getRsmAuthData("HQ\\ShepelevSA", "!141605lorans");

    // ===== TEST 1 =====

    const result = await getRoomList(88, rsmToken); // Список комнат по UNOM (88)

    fs.writeFile("./test_output/result.json", JSON.stringify(result), function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("The file was saved!");
    });

    // ===== TEST 2 =====

    // const result = await getContractSearchResult({ number_dog: "6132013409" }, rsmToken); // Договор по номеру (6132013409)
    // const result = await getContractSearchResult({ type: "[4]", IS_OLDHOSTEL: "true" }, rsmToken); // Договоры по по статусу зареган (type: [4]) и бывшее общежитие (IS_OLDHOSTEL: true)

    // fs.writeFile("./test_output/result.json", JSON.stringify(result), function (err) {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     console.log("The file was saved!");
    // });

    // ===== TEST 3 =====

    // const result = await getContractCount("88", sessionKey, rsmToken);
    // console.log(result);

    // const result = await getContractsByUnom([88, 89], rsmToken);

    // fs.writeFile("./test_output/result.json", JSON.stringify(result), function (err) {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     console.log("The file was saved!");
    // });
}

test().catch((e) => {
    console.log(e);
});
