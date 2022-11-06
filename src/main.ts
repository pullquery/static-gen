import PaperWorker from "./PaperWorker";

(async () => {
    await new PaperWorker("app/docs", "static/docs", "app/templates/doc.ejs").work();
})();