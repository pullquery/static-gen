import EsbuildWorker from "./workers/EsbuildWorker";
import PaperWorker from "./workers/PaperWorker";

(async () => {
    await new PaperWorker("app/papers", "static/papers", "app/templates/paper.ejs").work();
    await new EsbuildWorker("app/styles/style.css", "app/scripts/script.ts", "static").work();
})();