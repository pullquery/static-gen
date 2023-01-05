import fs from "fs";
import path from "path";

export default class MainRunner {
    run(src: string, dest: string) {
        this.dir(src, dest);
    }

    action(src: string, dest: string) {
        fs.copyFileSync(src, dest);
    }

    dir(src: string, dest: string) {
        const files = fs.readdirSync(src);
        fs.mkdirSync(dest);

        files.forEach((fileName) => {
            const newSrc = path.join(src, fileName);
            const newDest = path.join(dest, fileName);

            if (fs.statSync(newSrc).isDirectory()) {
                this.dir(newSrc, newDest);
            } else {
                this.action(newSrc, newDest);
            }
        });
    }
}