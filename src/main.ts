import EsbuildWorker from "./workers/EsbuildWorker";
import PaperWorker from "./workers/PaperWorker";

(async () => {
    await new PaperWorker("app/papers", "static/papers", "input/templates/paper.ejs").work();
    await new EsbuildWorker("app/styles/style.css", "input/scripts/script.ts", "static").work();
})();