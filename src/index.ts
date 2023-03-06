import { type AuthData, getAuthData } from "./services/api/getAuthData/getAuthData.js";
import { getDocHtml } from "./services/api/getDocHtml/getDocHtml.js";
import { parseDocHtml } from "./services/parser/parseEgoDocHtml.js";
import fs from "fs";

// testing testing 123
async function saveDocHTML(id: string, authData: AuthData, resultArr: any[]) {
    try {
        const doc = await getDocHtml(id, authData);

        resultArr.push(parseDocHtml(doc));
    } catch (e) {
        console.log(e);
    }
}

async function wrightAllToFile() {
    const resultArr: any[] = [];
    const docList = ["489473013", "490332402", "491065535"];
    const loginData = {
        userId: 3349311,
        password: "!141605lorans",
    };

    const authData = await getAuthData(loginData.userId, loginData.password);

    await Promise.all(
        docList.map(async (doc) => {
            await saveDocHTML(doc, authData, resultArr);
        }),
    );

    // console.log(resultArr[0]);

    if (resultArr) {
        fs.writeFile("./test_output/result.json", JSON.stringify(resultArr), function (err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("The file was saved!");
        });
    }
}

wrightAllToFile().catch((e) => {
    console.log(e);
});
