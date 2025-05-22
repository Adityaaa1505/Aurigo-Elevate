function extractEstimatedDays(response) {
    const patterns = [
        /final estimated construction time.*?(\d+)\s*[-–]?\s*(\d+)?\s*days/i,
        /estimated construction time.*?(\d+)\s*[-–]?\s*(\d+)?\s*days/i,
        /approximately\s*(\d+)\s*[-–]?\s*(\d+)?\s*days/i,
        /around\s*(\d+)\s*[-–]?\s*(\d+)?\s*days/i,
        /days:\s*(\d+)\s*[-–]?\s*(\d+)?/i,
        /(\d+)\s*[-–]?\s*(\d+)?\s*days/i,
    ];
    for (const pattern of patterns) {
        const match = response.match(pattern);
        if (match) {
            if (match[2]) return `${match[1]}–${match[2]} days`;
            return `${match[1]} days`;
        }
    }
    return "Not found";
}
module.exports = extractEstimatedDays;
