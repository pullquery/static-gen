import fs from "fs/promises";

export default class ArticlesDir {
    dir: string;

    constructor(dir: string) {
        this.dir = dir;
    }

    async getFiles() {
        return await fs.readdir(this.dir);
    }
}
