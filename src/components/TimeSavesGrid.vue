<script setup lang="ts">
import { ref } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import {
	renderWrappedCell,
	renderRatingBadge,
	alpineCheesed,
} from "../utils/agGridUtils";

import rowDataJson from "../assets/time-saves-data.json";

ModuleRegistry.registerModules([AllCommunityModule]);

const columnDefs = ref<ColDef[]>([
	{
		headerName: "NAME",
		field: "name",
		sortable: true,
		filter: true,
		wrapText: true,
		cellRenderer: (params: ICellRendererParams) =>
			renderWrappedCell(params.value),
		flex: 0.5,
	},
	{
		headerName: "SCORE",
		field: "score",
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
		width: 100,
	},
	{
		headerName: "DESCRIPTION",
		field: "description",
		filter: true,
		flex: 1.5,
		autoHeight: true,
		sortable: false,
		cellRenderer: (params: ICellRendererParams) =>
			renderWrappedCell(params.value),
	},
	{
		headerName: "BENEFIT",
		field: "benefit",
		sortable: false,
		filter: true,
		flex: 1,
		autoHeight: true,
		cellRenderer: (params: ICellRendererParams) =>
			renderWrappedCell(params.value),
		hide: window.innerWidth < 600,
	},
]);

const rowData = ref(rowDataJson);

const defaultColDef: ColDef = {
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
			:theme="alpineCheesed"
		/>
	</div>
</template>

<style scoped>
.ag-grid-scroll-wrapper {
	overflow-x: auto;
	width: 100%;
}
</style>
