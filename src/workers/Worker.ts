import fs from "fs";

export default class Worker {
    protected src: string;
    protected dest: string;

    constructor(src: string, dest: string) {
        this.src = src;
        this.dest = dest;
    };

    run() {
        fs.copyFileSync(this.src, this.dest);
    }
}