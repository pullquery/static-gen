import _fs from "fs";

import { build } from "esbuild";

export default class EsbuildWorker {
    private readonly styleEntry: string;
    private readonly scriptEntry: string;
    private readonly staticDir: string;

    constructor(styleEntry: string, scriptEntry: string, staticDir: string) {
        this.styleEntry = styleEntry;
        this.scriptEntry = scriptEntry;
        this.staticDir = staticDir;

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

    async work() {
        build({
            entryPoints: [this.styleEntry, this.scriptEntry],
            outdir: "static",
            target: "es5",
            bundle: true,
            minify: true
        });
    }
}
