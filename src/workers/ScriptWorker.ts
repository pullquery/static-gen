import esbuild from "esbuild";

export default class ScriptRunner {
    src: string;
    dest: string;

    constructor(src: string, dest: string) {
        this.src = src;
        this.dest = dest;
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