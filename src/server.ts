import Express, { Request, Response } from "express";
import Path from "path";
import logger from "./logging";
import fs from "fs";
import { validateIssueId } from "./util";

const app = Express();
const port = 4001;
const pathPublic = Path.resolve(__dirname, "..", "public");
const mojiraUrl = "https://bugs.mojang.com/browse/MC/issues/";

// Middleware
app.use(logger);
app.use(Express.json());

// Routes
app.get("/:issue", (req: Request, res: Response) => {
    const issueId = req.params.issue;
    if (!validateIssueId(issueId)) {
        res.sendStatus(400);
        return;
    }

    let html = fs.readFileSync(pathPublic + '/template.html', 'utf-8');

    html = html.replaceAll('$title', issueId);
    html = html.replaceAll('$issue-title', `Title: ${issueId}`);
    html = html.replaceAll('$issue-description', `Description: ${issueId}`);
    html = html.replaceAll('$issue-link', mojiraUrl + issueId);
    html = html.replaceAll('$issue-id', issueId);


    res.status(200).send(html);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
