import Express, { Request, Response } from "express";
import Path from "path";
import logger from "./logging";
import fs from "fs";
import { fetchRenderedHTML, validateIssueId } from "./util";

const app = Express();
const port = 4001;
const pathPublic = Path.resolve(__dirname, "..", "public");
const mojiraUrl = "https://bugs.mojang.com/browse/MC/issues/";

// Middleware
app.use(logger);
app.use(Express.json());

// Routes
app.get("/", async (req: Request, res: Response) => {
    res.sendStatus(404);
});

app.get("/mc-issue/:issue", async (req: Request, res: Response) => {
    const issueId = req.params.issue;
    if (!validateIssueId(issueId)) {
        res.sendStatus(400);
        return;
    }

    const issueUrl = mojiraUrl + issueId;
    const fetch = await fetchRenderedHTML(issueUrl);

    const titleStart = fetch.indexOf("<h4 class=\"MuiTypography-root MuiTypography-h4 css-1klm1w7\">"); // length = 60
    const titleEnd = fetch.indexOf("</h4>", titleStart);
    const title = fetch.substring(titleStart + 60, titleEnd);
    console.log(title);

    let html = fs.readFileSync(pathPublic + '/template.html', 'utf-8');

    html = html.replaceAll('$title', issueId);
    html = html.replaceAll('$issue-title', `[${issueId}]`);
    html = html.replaceAll('$issue-description', title);
    html = html.replaceAll('$issue-link', issueUrl);
    html = html.replaceAll('$issue-id', issueId);

    res.status(200).send(html);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
