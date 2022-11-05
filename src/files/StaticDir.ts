import fs from "fs/promises";

export default class StaticDir {
    dir: string;

    constructor(dir: string) {
        this.dir = dir;
    }

    async initDir() {
        try {
            await fs.access(this.dir);
            await fs.rm(this.dir, {
                recursive: true,
                force: true
            });
            await fs.mkdir(this.dir);
        } catch {
            await fs.mkdir(this.dir);
        }
    }
}