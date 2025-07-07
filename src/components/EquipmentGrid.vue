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
	},
	{
		headerName: "Rating",
		field: "rating",
		cellClass: "ag-center-cols-cell",
		cellRenderer: (params: any) => {
			const grade = params.value;
			const colors: Record<string, string> = {
				S: "#fbc02d", // Gold Yellow
				A: "#66bb6a", // Soft Green
				B: "#42a5f5", // Soft Blue
				C: "#90a4ae", // Slate Gray
				D: "#ff7043", // Burnt Orange
				F: "#ef5350", // Soft Red
			};
			const color = colors[grade] || "#ccc";

			return `<span style="
      background-color: ${color};
      color: white;
      padding: 1px 8px;
      border-radius: 10px;
      font-weight: bold;
      display: inline-block;
      min-width: 20px;
      text-align: center;
    ">${grade}</span>`;
		},
		width: 100,
		sortable: true,
		filter: true,
		flex: 0.25,
	},
	{
		headerName: "Type",
		field: "type",
		sortable: true,
		filter: true,
		flex: 0.3,
	},
	{
		headerName: "Notes",
		field: "notes",
		sortable: true,
		filter: true,
		flex: 1.5,
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
	},
	{
		headerName: "Specifications",
		field: "specifications",
		sortable: true,
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
	},
]);

const rowData = ref(rowDataJson);

const defaultColDef: ColDef = {
	flex: 1,
	resizable: true,
};
</script>

<template>
	<div style="width: 100%; height: 600px">
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
