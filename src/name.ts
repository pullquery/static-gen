class WrongFileNameError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "WrongFileNameError";
    }
}

export function checkFileName(fileName: string): boolean {


    if (
        fileName.endsWith(".md") &&
        convertFileName(fileName) != "index.html" && // Temp
        convertFileName(fileName) != "about.html" // Temp
    ) {
        return true;
    } else {
        throw new WrongFileNameError("File name cannot be 'index.html' or 'about.html'.");
    }
}

export function convertFileName(fileName: string) {
    return fileName.slice(
        0, fileName.lastIndexOf(".md")
    ) + ".html";
}