import esbuild from "esbuild";

import Worker from "./Worker";

export default class StyleWorker extends Worker {
    constructor(src: string, dest: string) {
        super(src, dest);
    };

    run() {
        esbuild.build({
            entryPoints: [this.src],
            outfile: this.dest,
            minify: true
        });
    }
}