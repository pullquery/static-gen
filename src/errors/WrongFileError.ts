export default class WrongFileError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "WrongFileError";
    }
}