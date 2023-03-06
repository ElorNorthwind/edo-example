export function extractDate(datestr: string | undefined): Date | undefined {
    const dateRe = /(\d{2})\.(\d{2})\.(\d{4})/i;
    if (!datestr || !dateRe.test(datestr)) {
        return undefined;
    }
    const matches = datestr.match(dateRe);
    if (!matches) {
        return undefined;
    }
    return new Date(`${matches[3]}-${matches[2]}-${matches[1]}`);
}
