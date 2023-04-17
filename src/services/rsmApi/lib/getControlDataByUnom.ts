export function getControlDataByUnom(unom: number | number[], escape: boolean = false) {
    let searchString;
    if (Array.isArray(unom)) {
        // [{"IdControl":"Unom","StringValue":"88","ControlType":"DynamicNumber","QueryOperation":"list","IdAttribute":"45100200"},{"IdControl":"Unom","StringValue":"89","ControlType":"DynamicNumber","QueryOperation":"list","IdAttribute":"45100200"}]
        searchString = `[${unom
            .map(
                (element) =>
                    `{"IdControl":"Unom","StringValue":"${String(
                        element,
                    )}","ControlType":"DynamicNumber","QueryOperation":"list","IdAttribute":"45100200"}`,
            )
            .join(",")}]`;
    } else {
        // [{"IdControl":"Unom","StringValue":"88","ControlType":"DynamicNumber","QueryOperation":"Equal"}]
        searchString = `[{"IdControl":"Unom","StringValue":"${String(
            unom,
        )}","ControlType":"DynamicNumber","QueryOperation":"Equal"}]`;
    }

    if (escape) {
        return searchString.replace(/"/g, `\\"`);
    } else {
        return searchString;
    }
}
