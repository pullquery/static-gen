import fs from "fs";
import path from "path";

import { checkIsDirectory, splitFilename } from "../file";

import Worker from "./Worker";
import PaperWorker from "./MdWorker";
import ScriptWorker from "./ScriptWorker";
import StyleWorker from "./StyleWorker";

export default class MainRunner extends Worker {
    constructor(src: string, dest: string) {
        super(src, dest);
    };

    run() {
        this.readDir(this.src, this.dest);
    }

    private readDir(src: string, dest: string) {
        const files = fs.readdirSync(src);
        fs.mkdirSync(dest);

        files.forEach((fileName) => {
            const newSrc = path.join(src, fileName);
            const newDest = path.join(dest, fileName);

            if (checkIsDirectory(newSrc)) {
                this.readDir(newSrc, newDest);
            } else {
                this.copyFile(newSrc, newDest);
            }
        });
    }

    private copyFile(src: string, dest: string) {
        const [_srcBody, srcExtension] = splitFilename(src);
        const [destBody, _destExtension] = splitFilename(dest);

        let copyWorker: Worker;

        switch (srcExtension.toLowerCase()) {
            case "md":
                copyWorker = new PaperWorker(src, destBody + ".html", "./templates/md.ejs");
                break;
            case "js":
            case "ts":
                copyWorker = new ScriptWorker(src, destBody + ".js");
                break;
            case "css":
                copyWorker = new StyleWorker(src, destBody + ".css");
                break;
            default:
                copyWorker = new Worker(src, dest);
        }

        copyWorker.run();
    }
}