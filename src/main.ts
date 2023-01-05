import fs from "fs";
import path from "path";

function dir(src: string, dest: string) {
    // init src, dest
    const files = fs.readdirSync(src);
    fs.mkdirSync(dest);

    files.forEach((fileName) => {
        // update src, dest
        const srcPath = path.join(src, fileName);
        const destPath = path.join(dest, fileName);

        if (fs.statSync(srcPath).isDirectory()) {
            dir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}

dir("input", "output");