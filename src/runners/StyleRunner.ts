import esbuild from "esbuild";

export default class StyleRunner {
    static run(src: string, dest: string) {
        esbuild.build({
            entryPoints: [src],
            outfile: dest,
            minify: true
        });
    }
}