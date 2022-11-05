import fs from "fs/promises";
import ejs from "ejs";
import MarkdownIt from "markdown-it";

export async function readArticlesDir(): Promise<string[]> {
    return await fs.readdir("resource/articles");
}

export async function readArticleFile(fileName: string): Promise<string> {
    return await fs.readFile(`resource/articles/${fileName}`, {
        encoding: "utf8"
    });
}

export async function checkStaticDir(): Promise<boolean> {
    try {
        await fs.access("static");
        return true;
    } catch {
        return false;
    }
}

export async function createStaticDir() {
    await fs.mkdir("static");
}

export async function removeStaticDir() {
    await fs.rm("static", {
        recursive: true,
        force: true
    });
}

export async function writeStaticFile(fileName: string, content: string): Promise<void> {
    const md = new MarkdownIt();

    await fs.writeFile(
        `static/${fileName}`,
        await ejs.renderFile("resource/templates/article.ejs", {
            title: fileName,
            content: md.render(content)
        })
    );
}