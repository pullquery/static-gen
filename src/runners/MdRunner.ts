import fs from "fs";
import ejs from "ejs";
import { marked } from "marked";

export default class PaperRunner {
    static run(src: string, dest: string) {
        this.action(src, dest, "src/templates/md.ejs");
    }

    static action(src: string, dest: string, template: string) {
        const content = fs.readFileSync(src, "utf8");

        ejs.renderFile(template, {
            title: "Paper",
            content: marked(content, { headerIds: false }),
        }).then(rendered => fs.writeFileSync(dest, rendered));
    }
}