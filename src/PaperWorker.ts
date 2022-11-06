import fs from "fs/promises";
import _fs from "fs";

import PaperModel from "./PaperModel";
import path from "path";

export default class PaperWorker {
    appDir: string;
    staticDir: string;

    appFiles?: PaperModel[];
    template: string;

    constructor(appDir: string, staticDir: string, template: string) {
        this.appDir = appDir;
        this.staticDir = staticDir;
        this.template = template;

        if (_fs.existsSync(this.staticDir)) {
            _fs.rmSync(this.staticDir, {
                recursive: true,
                force: true
            });
        }
        _fs.mkdirSync(this.staticDir, {
            recursive: true
        });
    }

    private async loadFiles() {
        const files = await fs.readdir(this.appDir);
        this.appFiles = files.map(file => new PaperModel(this.appDir, file));

        await Promise.all(
            this.appFiles.map(async article => await article.loadContent())
        );
    }

    private async renderFiles() {
        await Promise.all(
            this.appFiles!.map(async article => await article.renderContent(this.template))
        );
    }

    private async writeFiles() {
        await Promise.all(
            this.appFiles!.map(async article => await fs.writeFile(
                path.join(this.staticDir, article.staticFile),
                article.staticContent!)
            )
        );
    }

    async work() {
        await this.loadFiles();
        await this.renderFiles();
        await this.writeFiles();
    }
}