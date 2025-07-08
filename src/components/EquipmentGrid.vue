<script setup lang="ts">
import { ref } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import {
	AllCommunityModule,
	ModuleRegistry,
	themeAlpine,
	themeMaterial,
	themeBalham,
	colorSchemeDarkBlue,
} from "ag-grid-community";

import rowDataJson from "../assets/equipment-data.json";

ModuleRegistry.registerModules([AllCommunityModule]);

const myTheme = themeAlpine.withPart(colorSchemeDarkBlue);

const columnDefs = ref<ColDef[]>([
	{
		headerName: "Item",
		field: "item",
		sortable: true,
		filter: true,
		cellRenderer: (params: any) =>
			`<a href="${params.data.url}" target="_blank" rel="noopener">${params.value}</a>`,
		flex: 0.5,
		pinned: "left",
	},
	{
		headerName: "Score",
		field: "rating",
		sortable: true,
		filter: "agNumberColumnFilter",
		sort: "desc",
		comparator: (a, b) => {
			const valA = a == null || isNaN(a) ? 0 : Number(a);
			const valB = b == null || isNaN(b) ? 0 : Number(b);
			return valA - valB;
		},
		cellClass: "rating-cell ag-center-cols-cell",
		cellRenderer: (params: any) => renderRatingBadge(params.value),
	},
	{
		headerName: "Type",
		field: "type",
		filter: true,
		flex: 0.3,
		hide: window.innerWidth < 600,
		sortable: false,
	},
	{
		headerName: "Notes",
		field: "notes",
		filter: true,
		flex: 1.5,
		autoHeight: true,
		sortable: false,
		cellRenderer: (params: ICellRendererParams) => {
			return `<div style="
            white-space: pre-line;
            word-break: break-word;
            padding: 8px 4px;
            line-height: 1.5;
            box-sizing: border-box;
            display: block;
            height: 100%;
        ">${params.value || ""}</div>`;
		},
	},
	{
		headerName: "Specifications",
		field: "specifications",
		sortable: false,
		filter: true,
		flex: 1,
		autoHeight: true,
		cellRenderer: (params: ICellRendererParams) => {
			return `<div style="
            white-space: pre-line;
            word-break: break-word;
            padding: 8px 4px;
            line-height: 1.5;
            box-sizing: border-box;
            display: block;
            height: 100%;
        ">${params.value || ""}</div>`;
		},
		hide: window.innerWidth < 600,
	},
]);

function renderRatingBadge(raw: any): string {
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

function getRatingColor(score: number | null | undefined): string {
	if (score == null || isNaN(score)) return "#bdbdbd"; // neutral gray for N/A or bad input
	if (score === 10) return "#29b6f6"; // standout blue
	if (score >= 8) return "#66bb6a"; // green
	if (score >= 6) return "#ffa726"; // amber
	return "#ef5350"; // red
}

const rowData = ref(rowDataJson);

const defaultColDef: ColDef = {
	flex: 1,
	resizable: true,
};
</script>

<template>
	<div
		class="ag-grid-scroll-wrapper line-height"
		style="width: 100%; height: 600px"
	>
		<AgGridVue
			class="ag-theme-alpine"
			style="height: 100%"
			:columnDefs="columnDefs"
			:rowData="rowData"
			:defaultColDef="defaultColDef"
			:animateRows="true"
			:theme="myTheme"
		/>
	</div>
</template>

<style scoped>
.ag-grid-scroll-wrapper {
	overflow-x: auto;
	width: 100%;
}
</style>
