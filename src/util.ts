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
