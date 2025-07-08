import { themeAlpine } from "ag-grid-community";

export function renderRatingBadge(raw: any): string {
	const score = Number(raw);
	const isNA = raw === null || raw === undefined || raw === "";

	const display = isNA ? "N/A" : score;
	const bgColor = isNA ? "#bdbdbd" : getRatingColor(score);
	const textColor = score === 10 ? "black" : "white";
	const fontSize = isNA ? "0.7rem" : "0.75rem";
	const fontWeight = isNA ? 500 : 600;

	return `<span style="
    background-color: ${bgColor};
    color: ${textColor};
    font-size: ${fontSize};
    padding: 2px 6px;
    font-weight: ${fontWeight};
    display: inline-block;
  ">${display}</span>`;
}

export function getRatingColor(score: number | null | undefined): string {
	if (score == null || isNaN(score)) return "#bdbdbd"; // neutral gray for N/A or bad input
	if (score === 10) return "#29b6f6"; // standout blue
	if (score >= 8) return "#66bb6a"; // green
	if (score >= 6) return "#ffa726"; // amber
	return "#ef5350"; // red
}

export function renderWrappedCell(content: string | null | undefined): string {
	return `<div style="
    white-space: pre-line;
    word-break: break-word;
    padding: 8px 4px;
    line-height: 1.5;
    box-sizing: border-box;
    display: block;
    height: 100%;
  ">${content || ""}</div>`;
}

export const alpineCheesed = themeAlpine.withParams({
	fontFamily: "sans-serif",
	headerFontFamily: "Cascadia Code",
	cellFontFamily: "monospace",
});
