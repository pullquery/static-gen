import fs from "fs/promises";
import path from "path";

import ejs from "ejs";
import MarkdownIt from "markdown-it";

import ArticlesDir from "./ArticlesDir";
import StaticDir from "./StaticDir";
import WrongFileError from "../errors/WrongFileError";

export default class Article {
    private articleDir: ArticlesDir;
    private staticDir: StaticDir;
    private file: string;
    private content?: string;
    private articleTemplate: string = "resource/templates/article.ejs";

    private get mdFile() {
        return this.file.slice(
            0, this.file.lastIndexOf(".md")
        ) + ".html";
    }

    constructor(articleDir: ArticlesDir, staticDir: StaticDir, file: string) {
        this.articleDir = articleDir;
        this.staticDir = staticDir;
        this.file = file;
    }

    private async checkFile() {
        if (this.file.endsWith(".md")) {
            return true;
        } else {
            throw new WrongFileError("Article should be Markdown(.md) file");
        }
    }

    private async loadContent() {
        this.content = await fs.readFile(
            path.join(this.articleDir.dir, this.file),
            { encoding: "utf8" }
        );
    }

    async writeStatic() {
        await this.checkFile();
        await this.loadContent();

        const md = new MarkdownIt();

        await fs.writeFile(
            path.join(this.staticDir.dir, this.mdFile),
            await ejs.renderFile(
                this.articleTemplate,
                { title: this.file, content: md.render(this.content!) }
            )
        );
    }
}