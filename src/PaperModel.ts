import fs from "fs/promises";
import path from "path";

import ejs from "ejs";
import MarkdownIt from "markdown-it";

export default class PaperModel {
    appDir: string;

    appFile: string;
    staticFile: string;

    appContent?: string;
    staticContent?: string;

    constructor(appDir: string, appFile: string) {
        this.appDir = appDir;

        if (appFile.endsWith(".md")) {
            this.appFile = appFile;
        } else {
            throw new Error("Document should be Markdown(.md) file");
        }

        this.staticFile = this.appFile.slice(
            0, this.appFile.lastIndexOf(".md")
        ) + ".html";
    }

    async loadContent() {
        this.appContent = await fs.readFile(
            path.join(this.appDir, this.appFile),
            { encoding: "utf8" }
        );
    }

    async renderContent(templateFile: string) {
        this.staticContent = await ejs.renderFile(
            templateFile,
            {
                title: this.appFile,
                content: new MarkdownIt().render(this.appContent!)
            }
        );
    }
}