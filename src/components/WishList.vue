<script setup lang="ts">
import { ref } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import {
	renderWrappedCell,
	alpineCheesed,
} from "../utils/agGridUtils";

import rowDataJson from "../assets/wish-list.json";

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
		headerName: "REQUESTED BY",
		field: "requestedBy",
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
