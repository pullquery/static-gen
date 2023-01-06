import fs from "fs";
import ejs from "ejs";
import { marked } from "marked";

export default class PaperRunner {
    static run(src: string, dest: string) {
        const content = fs.readFileSync(src, "utf8");

        ejs.renderFile("src/templates/md.ejs", {
            title: "Paper",
            content: marked(content, { headerIds: false }),
        }).then(rendered => fs.writeFileSync(dest, rendered));
    }
}