import Express, { Request, Response } from "express";
import Path from "path";
import logger from "./logging";
import fs from "fs";
import dayjs from "dayjs";
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
        res.sendStatus(404);
        return;
    }
    
    res.status(200).sendFile(pathPublic + '/template.html');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
