import fs from "fs";
import path from "path";

import { splitFilename } from "../util";

import PaperRunner from "./MdRunner";
import ScriptRunner from "./ScriptRunner";
import StyleRunner from "./StyleRunner";

export default class MainRunner {
    static run(src: string, dest: string) {
        const files = fs.readdirSync(src);
        fs.mkdirSync(dest);

        files.forEach((fileName) => {
            const newSrc = path.join(src, fileName);
            const newDest = path.join(dest, fileName);

            if (fs.statSync(newSrc).isDirectory()) {
                this.run(newSrc, newDest);
            } else {
                this.convey(newSrc, newDest);
            }
        });
    }

    static convey(src: string, dest: string) {
        const [_srcBody, srcExtension] = splitFilename(src);
        const [destBody, _destExtension] = splitFilename(dest);

        switch (srcExtension.toLowerCase()) {
            case "md":
                PaperRunner.run(src, destBody + ".html");
                break;
            case "js":
            case "ts":
                ScriptRunner.run(src, destBody + ".js");
                break;
            case "css":
            case "scss":
                StyleRunner.run(src, destBody + ".css");
                break;
            default:
                fs.copyFileSync(src, dest);
        }
    }
}