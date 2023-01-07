import esbuild from "esbuild";

export default class StyleRunner {
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
            minify: true
        });
    }
}