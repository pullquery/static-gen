import fs from "fs";
import path from "path";

import { splitFilename } from "../strings";

import PaperRunner from "./MdWorker";
import ScriptRunner from "./ScriptWorker";
import StyleRunner from "./StyleWorker";

export default class MainRunner {
    src: string;
    dest: string;

    constructor(src: string, dest: string) {
        this.src = src;
        this.dest = dest;
    };

    run() {
        this.action(this.src, this.dest);
    }

    action(src: string, dest: string) {
        const files = fs.readdirSync(src);
        fs.mkdirSync(dest);

        files.forEach((fileName) => {
            const newSrc = path.join(src, fileName);
            const newDest = path.join(dest, fileName);

            if (fs.statSync(newSrc).isDirectory()) {
                this.action(newSrc, newDest);
            } else {
                this.convey(newSrc, newDest);
            }
        });
    }

    convey(src: string, dest: string) {
        const [_srcBody, srcExtension] = splitFilename(src);
        const [destBody, _destExtension] = splitFilename(dest);

        switch (srcExtension.toLowerCase()) {
            case "md":
                new PaperRunner(src, destBody + ".html", "./templates/md.ejs").run();
                break;
            case "js":
            case "ts":
                new ScriptRunner(src, destBody + ".js").run();
                break;
            case "css":
                new StyleRunner(src, destBody + ".css").run();
                break;
            default:
                fs.copyFileSync(src, dest);
        }
    }
}