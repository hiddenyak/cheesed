<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import {
	renderWrappedCell,
	renderRatingBadge,
	alpineCheesed,
} from "../utils/agGridUtils";

import rowDataJson from "../assets/equipment-data.json";
import { EquipmentItem } from "@/types/equipment";

ModuleRegistry.registerModules([AllCommunityModule]);

const selected = ref<EquipmentItem | null>(null);
const isMobile = ref(window.innerWidth < 1000);

function selectItem(item: any) {
	console.log("Selected item:", item);
	selected.value = item;
}

const sortedRowData = computed(() =>
	[...rowData.value].sort((a, b) => {
		const aScore = a.rating == null ? 0 : Number(a.rating);
		const bScore = b.rating == null ? 0 : Number(b.rating);
		return bScore - aScore; // highest first
	})
);

onMounted(() => {
	window.addEventListener("resize", () => {
		isMobile.value = window.innerWidth < 1000;
	});
});

const columnDefs = ref<ColDef[]>([
	{
		headerName: "ITEM",
		field: "item",
		sortable: true,
		filter: true,
		cellRenderer: (params: any) =>
			`<a href="${params.data.url}" target="_blank" rel="noopener">${params.value}</a>`,
		flex: 0.5,
		pinned: "left",
	},
	{
		headerName: "SCORE",
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
		width: 100,
	},
	{
		headerName: "TYPE",
		field: "type",
		filter: true,
		flex: 0.3,
		hide: window.innerWidth < 600,
		sortable: false,
	},
	{
		headerName: "NOTES",
		field: "notes",
		filter: true,
		flex: 1.5,
		autoHeight: true,
		sortable: false,
		cellRenderer: (params: ICellRendererParams) =>
			renderWrappedCell(params.value),
	},
	{
		headerName: "SPECIFICATIONS",
		field: "specifications",
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
	<div>
		<!-- Mobile List -->
		<div v-if="isMobile">
			<div
				class="mobile-item"
				v-for="item in sortedRowData"
				:key="item.item"
				@click="selectItem(item)"
			>
				<div class="item-name">{{ item.item }}</div>
				<div class="item-rating" v-html="renderRatingBadge(item.rating)"></div>
			</div>

			<!-- Modal -->
			<div v-if="selected" class="modal-backdrop" @click.self="selected = null">
				<div class="modal-content">
					<button class="close-btn" @click="selected = null">✖</button>
					<h3>{{ selected.item }}</h3>
					<p><strong>Notes:</strong> {{ selected.notes }}</p>
					<p><strong>Specs:</strong> {{ selected.specifications }}</p>
					<a :href="selected.url" target="_blank">View Product</a>
				</div>
			</div>
		</div>

		<div
			v-else
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
	</div>
</template>

<style scoped>
.ag-grid-scroll-wrapper {
	overflow-x: auto;
	width: 100%;
}

.mobile-item {
	display: flex;
	justify-content: space-between;
	padding: 10px;
	margin: 8px 8px;
	background: #333842;
	cursor: pointer;
}

.item-name {
	font-weight: bold;
}

.modal-backdrop {
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	background: rgba(0, 0, 0, 0.6);
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem;
}

.modal-content {
	background: #23272e;
	border-radius: 12px;
	padding: 1.5rem;
	width: 100%;
	max-width: 400px;
	position: relative;
	text-align: left;
}

.close-btn {
	position: absolute;
	top: 0.75rem;
	right: 0.75rem;
	background: transparent;
	border: none;
	font-size: 1.25rem;
	cursor: pointer;
}
</style>
