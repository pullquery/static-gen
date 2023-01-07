export function splitFilename(filename: string): [string, string] {
    const elements = filename.split(".");

    if (elements.length < 2) {
        return [
            elements.join(".") ?? "",
            "",
        ];
    } else {
        const extension = elements.pop();

        return [
            elements.join(".") ?? "",
            extension ?? "",
        ];
    }
};

// export function getMdTitle(content: string): string {
//     return ""
// }