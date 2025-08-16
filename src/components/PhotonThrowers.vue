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

import rowDataJson from "../assets/photon-throwers-data.json";
import { PhotonThrowerItem } from "@/types/grid";

ModuleRegistry.registerModules([AllCommunityModule]);

const selected = ref<PhotonThrowerItem | null>(null);
const isMobile = ref(window.innerWidth < 1000);

function selectItem(item: any) {
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
		headerName: "NAME",
		field: "name",
		sortable: true,
		cellRenderer: (params: any) =>
			`<a href="${params.data.url}" target="_blank" rel="noopener">${params.value}</a>`,
		pinned: "left",
		width: 150,
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
		headerName: "NOTES",
		field: "notes",
		autoHeight: true,
		sortable: false,
		cellRenderer: (params: ICellRendererParams) =>
			renderWrappedCell(params.value),
	},
	{
		headerName: "PRICE",
		field: "price",
		width: 80,
	},
	{
		headerName: "BRAND",
		field: "brand",
		width: 80,
	},
	{
		headerName: "WEIGHT",
		field: "weight",
		width: 80,
	},
	{
		headerName: "LIGHT TYPE",
		field: "lightType",
		width: 80,
	},
	{
		headerName: "EMITTER",
		field: "emitter",
		width: 120,
	},
	{
		headerName: "LUMENS (HIGH)",
		field: "lumensHigh",
		width: 80,
	},
	{
		headerName: "CANDELA (HIGH)",
		field: "candelaHigh",
		width: 90,
	},
	{
		headerName: "RANGE (HIGH)",
		field: "distanceHigh",
		width: 80,
	},
	{
		headerName: "RUN TIME (HIGH)",
		field: "runTimeHigh",
		width: 80,
	},
	{
		headerName: "LUMENS (LOW)",
		field: "lumensLow",
		width: 80,
	},
	{
		headerName: "CANDELA (LOW)",
		field: "candelaLow",
		width: 90,
	},
	{
		headerName: "RANGE (LOW)",
		field: "distanceLow",
		width: 80,
	},
	{
		headerName: "RUN TIME (LOW)",
		field: "runTimeLow",
		width: 80,
	},
	{
		headerName: "ZOOMABLE",
		field: "adjustableFocus",
		width: 100,
	},
	{
		headerName: "ONBOARD CHARGING",
		field: "usbRechargeable",
		width: 100,
	},
	{
		headerName: "BATTERY",
		field: "batteryType",
		width: 150,
	},
	{
		headerName: "WATERPROOF",
		field: "waterResistance",
		width: 110,
	},
]);

const rowData = ref(rowDataJson);

const defaultColDef: ColDef = {
	resizable: true,
	filter: true,
};
</script>

<template>
	<div>
		<!-- Mobile List -->
		<div v-if="isMobile">
			<div
				class="mobile-item"
				v-for="item in sortedRowData"
				:key="item.name"
				@click="selectItem(item)"
			>
				<div class="item-name">{{ item.name }}</div>
				<div class="item-rating" v-html="renderRatingBadge(item.rating)"></div>
			</div>

			<!-- Modal -->
			<div v-if="selected" class="modal-backdrop" @click.self="selected = null">
				<div class="modal-content">
					<button class="close-btn" @click="selected = null">✖</button>
					<h3>{{ selected.name }}</h3>
					<p><strong>Brand:</strong> {{ selected.brand }}</p>
					<p><strong>Weight:</strong> {{ selected.weight }}</p>
					<p><strong>Light Type:</strong> {{ selected.lightType }}</p>
					<p><strong>Emitter:</strong> {{ selected.emitter }}</p>
					<p><strong>Lumens (High):</strong> {{ selected.lumensHigh }}</p>
					<p><strong>Lumens (Low):</strong> {{ selected.lumensLow }}</p>
					<p><strong>Candela (High):</strong> {{ selected.candelaHigh }}</p>
					<p><strong>Candela (Low):</strong> {{ selected.candelaLow }}</p>
					<p><strong>Run Time (High):</strong> {{ selected.runTimeHigh }}</p>
					<p><strong>Run Time (Low):</strong> {{ selected.runTimeLow }}</p>
					<p><strong>Distance (High):</strong> {{ selected.distanceHigh }}</p>
					<p><strong>Distance (Low):</strong> {{ selected.distanceLow }}</p>
					<p>
						<strong>Focusable Beam:</strong>
						{{ selected.focusableBeam ? "Yes" : "No" }}
					</p>
					<p>
						<strong>Replaceable Battery:</strong>
						{{ selected.replaceableBattery ? "Yes" : "No" }}
					</p>
					<p><strong>Battery Type:</strong> {{ selected.batteryType }}</p>
					<p>
						<strong>USB Rechargeable:</strong>
						{{ selected.usbRechargeable ? "Yes" : "No" }}
					</p>
					<p>
						<strong>Onboard Charging:</strong>
						{{ selected.onboardCharging ? "Yes" : "No" }}
					</p>
					<p>
						<strong>Water Resistance:</strong> {{ selected.waterResistance }}
					</p>
					<p><strong>Price:</strong> {{ selected.price }}</p>
					<p>
						<strong>Score:</strong>
						<span v-html="renderRatingBadge(selected.rating)"></span>
					</p>
					<p>
						<strong>URL:</strong>
						<a :href="selected.url" target="_blank" rel="noopener">{{
							selected.url
						}}</a>
					</p>

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
				:headerHeight="75"
				:wrapHeaderText="true"
				:autoHeaderHeight="true"
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
