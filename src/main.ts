import { readArticlesDir, readArticleFile, writeStaticFile, checkStaticDir, createStaticDir, removeStaticDir } from "./files";
import { checkFileName, convertFileName } from "./name";

async function start() {
    const files = await readArticlesDir();

    files.forEach((fileName: string) => {
        checkFileName(fileName);
    });

    if (await checkStaticDir()) {
        await removeStaticDir();
    }

    await createStaticDir();

    files.forEach(async (fileName: string) => {
        await writeStaticFile(
            convertFileName(fileName),
            await readArticleFile(fileName)
        );
    });
}

start();
