import esbuild from "esbuild";

import Worker from "./Worker";

export default class ScriptWorker extends Worker {
    constructor(src: string, dest: string) {
        super(src, dest);
    };

    run() {
        esbuild.build({
            entryPoints: [this.src],
            outfile: this.dest,
            target: "es5",
            minify: true
        });
    }
}