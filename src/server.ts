import Express, { Request, Response } from "express";
import Path from "path";
import logger from "./middleware/logging";
import fs from "fs";
import dayjs from "dayjs";

const app = Express();
const port = 4001;
const pathPublic = Path.resolve(__dirname, "..", "public");

// Middleware
app.use(logger);
app.use(Express.json());

// Routes
app.get("/", (req: Request, res: Response) => {

});

app.get("/:issue", (req: Request, res: Response) => {
    
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
