import Article from "./files/Article";
import ArticlesDir from "./files/ArticlesDir";
import StaticDir from "./files/StaticDir";

(async () => {
    const articlesDir = new ArticlesDir("resource/articles");
    const articles = await articlesDir.getFiles();

    const staticDir = new StaticDir("static");
    await staticDir.initDir();

    articles.forEach(async (file) => {
        await new Article(articlesDir, staticDir, file).writeStatic();
    });
})();