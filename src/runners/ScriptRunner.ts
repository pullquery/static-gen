import esbuild from "esbuild";

export default class ScriptRunner {
    static run(src: string, dest: string) {
        this.action(src, dest);
    }

    static action(src: string, dest: string) {
        esbuild.build({
            entryPoints: [src],
            outfile: dest,
            target: "es5",
            minify: true
        });
    }
}