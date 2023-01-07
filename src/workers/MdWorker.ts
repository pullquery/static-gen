import fs from "fs";
import ejs from "ejs";
import { marked } from "marked";

export default class PaperRunner {
    src: string;
    dest: string;
    template: string;

    constructor(src: string, dest: string, template: string) {
        this.src = src;
        this.dest = dest;
        this.template = template;
    };

    run() {
        const content = fs.readFileSync(this.src, "utf8");

        ejs.renderFile(this.template, {
            title: "Paper",
            content: marked(content, { headerIds: false }),
        }).then(rendered => fs.writeFileSync(this.dest, rendered));
    }
}