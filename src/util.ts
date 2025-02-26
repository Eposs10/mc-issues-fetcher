import puppeteer from "puppeteer";

export function validateIssueId(issueId: string): boolean {
    if (!issueId) return false;
    if (!issueId.startsWith("MC-")) return false;
    if (issueId.length < 4) return false;

    const idPart = issueId.split("-")[1];
    return isNumericRegex(idPart);


}

function isNumericRegex(str: string): boolean {
    return /^\d+$/.test(str);
}

export async function fetchHTML(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.text();
}

export async function fetchRenderedHTML(url: string): Promise<string> {
    const browser = await puppeteer.launch({headless: true}); // Runs in headless mode
    const page = await browser.newPage();

    await page.goto(url, {waitUntil: "networkidle2"}); // Waits for the page to fully load

    const html = await page.content(); // Gets the fully rendered HTML
    await browser.close();

    return html;
}
