export interface RsmSearchQuery {
    searchData?: Record<string, string>;
    dynamicControlData?: {
        unom?: number[] | number; // 45100200
        cadastrNum?: string[] | string; // 45002800
        signDate?: { from: string; to: string }; // "2023-01-01T00:00:00"
    };
}

export function formatSearchQueryString(query: RsmSearchQuery) {
    const result: { search: Record<string, string>; count: Record<string, string> } = { search: {}, count: {} };

    if (query?.searchData) {
        Object.keys(query.searchData).forEach(function (key, index) {
            result.search[`searchData[${index}].key`] = key;
            result.search[`searchData[${index}].value`] = query.searchData?.[key] || "";
        });
        result.count.searchData = `[${Object.keys(query.searchData)
            .map((key) => `{"key":"${key}","value":"${query.searchData?.[key] || ""}"}`)
            .join(",")}]`;
    }

    if (query?.dynamicControlData) {
        const controlDataArr = [];

        // Обрабатываем UNOM
        if (Array.isArray(query?.dynamicControlData?.unom)) {
            query.dynamicControlData.unom.forEach((element) => {
                controlDataArr.push(
                    `{"IdControl":"Unom","StringValue":"${element}","ControlType":"DynamicNumber","QueryOperation":"list","IdAttribute":"45100200"}`,
                );
            });
        } else if (typeof query?.dynamicControlData?.unom === "number") {
            controlDataArr.push(
                `[{"IdControl":"Unom","StringValue":"${query.dynamicControlData.unom}","ControlType":"DynamicNumber","QueryOperation":"Equal"}]`,
            );
        }

        // Обрабатываем Кадастровый номер
        if (Array.isArray(query?.dynamicControlData?.cadastrNum)) {
            query.dynamicControlData.cadastrNum.forEach((element) => {
                controlDataArr.push(
                    `{"IdControl":"Unom","StringValue":"${element}","ControlType":"DynamicNumber","QueryOperation":"list","IdAttribute":"45002800"}`,
                );
            });
        } else if (typeof query?.dynamicControlData?.cadastrNum === "string") {
            controlDataArr.push(
                `[{"IdControl":"CadastrNum","StringValue":"${query.dynamicControlData.cadastrNum}","ControlType":"DynamicNumber","QueryOperation":"Equal"}]`,
            );
        }

        // Обрабатываем дату
        if (Array.isArray(query?.dynamicControlData?.signDate)) {
            controlDataArr.push(
                `{"IdControl":"PERSON_SIGN_DATE","ControlType":"DynamicDate","IdAttribute":"45001000","From":"${query.dynamicControlData.signDate.from}","To":"${query.dynamicControlData.signDate.from}"}`,
            );
        }

        // добавляем результат в запросы
        if (controlDataArr.length > 0) {
            result.search.SearchDynamicControlData = `[${controlDataArr.join(",")}]`;
            result.count.SearchDynamicControlData = `[${controlDataArr.join(",")}]`;
        }
    }

    return result;
}
