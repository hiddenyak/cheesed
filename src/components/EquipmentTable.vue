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
		cellRenderer: (params: any) => {
			const grade = params.value;
			const colors: Record<string, string> = {
				S: "#ffd700", // gold
				A: "#4caf50", // green
				B: "#2196f3", // blue
				C: "#9e9e9e", // gray
				D: "#ff9800", // orange
				F: "#f44336", // red
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
		flex: 0.2,
	},
	{
		headerName: "Type",
		field: "type",
		sortable: true,
		filter: true,
		flex: 0.5,
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
	},
]);

const rowData = ref([
	{
		type: "Small Pouch",
		item: "Zip Pouch Pro",
		url: "https://alpakagear.com/products/zip-pouch-pro",
		specifications: "8.5cm x 13cm, X-Pac VX21 material, YKK zippers",
		notes:
			"Fits most pockets. Great wallet replacement. Have been using this for 6 months to carry cards, cash, carkey, and a small flashlight.",
		rating: "A",
	},
	{
		type: "Small Pouch",
		item: "Hub Pouch",
		url: "https://alpakagear.com/products/hub-pouch-pro",
		notes:
			"Too big when full for most pockets. Material which isn't stiff enough to keep shape, and also contorts in an unpleasant way when pouch is filled.",
		rating: "D",
		specifications: "12cm x 9cm, X-Pac VX21 material, YKK zippers",
	},
	{
		type: "Toiletry Pouch",
		item: "ALPAKA Toiletry Bag",
		url: "https://www.amazon.com/ALPAKA-Toiletry-Bag-Detachable-Accordion-Style/dp/B0CXX5JK32?...",
		notes:
			"Too small to carry an electric razor or electric toothbrush, but too large for only essentials. It's a high quality bag, but I don't use it.",
		rating: "C",
	},
	{
		type: "Toiletry Pouch",
		item: "Peak Design Wash Pouch",
		url: "https://www.peakdesign.com/products/wash-pouch?Size=Regular&Color=Black",
		notes:
			"This toiletry bag is on the larger side but I like it a lot it. Good for a longer trip or organization. I can fit all my toiletries in this bag including an electric razor and electric toothbrush. Has a built in hook to hang it up.",
		rating: "B",
	},
	{
		type: "Tech Pouch",
		item: "Peak Design Tech Pouch",
		url: "https://www.peakdesign.com/products/tech-pouch?Size=Regular&Color=Black",
		notes:
			"Offers great organization and ease of access with according style design and tons of pockets. Easy to organize essential tech items. I use it all the time.",
		rating: "A",
	},
	{
		type: "Key Organizer",
		item: "Jibbon Leather Key Organizer",
		url: "https://www.jibbonkey.com/products/all-black-key-organiser",
		notes:
			"It is extremely easy to add and remove keys, but durablility is questionable.",
		rating: "B",
		specifications: "Leather. Holds 3 to 9 standard keys",
	},
	{
		type: "Key Organizer",
		item: "Keyper Quick Release",
		url: "https://www.urbancarvers.com/products/keyper",
		rating: "UNTESTED",
		notes: "Magnetic Key Ring. Possibly a very convenient way to carry keys.",
	},
	{
		type: "Wallet",
		item: "Carbon Fiber Liquid Wallet",
		url: "https://liquidcarry.co/products/liquid-carbon-fiber-edition-gold-hardware",
		notes: "Wallet that can also carry keys",
		rating: "UNTESTED",
	},
	{
		type: "T-Shirt",
		item: "Crew Neck T-Shirt",
		url: "https://www.uniqlo.com/us/en/products/E422992-000/00?colorDisplayCode=09&sizeDisplayCode=003",
		notes:
			"Heavy-weight cotton. Binding at the collar helps the neckline keep its shape.",
		rating: "A",
		specifications: "100% Cotton. Machine wash cold, Tumble dry low.",
	},
	{
		type: "T-Shirt",
		item: "SUPIMA® Cotton T-Shirt",
		url: "https://www.uniqlo.com/us/en/products/E455365-000/00?colorDisplayCode=09&sizeDisplayCode=004",
		notes:
			"SUPIMA® cotton that is softer and more durable than regular cotton. This shirt resembles a classic t-shirt but has a more refined look.",
		rating: "B",
		specifications: "100% Cotton. Machine wash cold.",
	},
	{
		type: "T-Shirt",
		item: "Bronson Loopwheel Tubular Athletic T-Shirt",
		url: "https://bronsonshop.com/products/loopwheel-tubular-athletic-t-shirt-vintage-black?option1=White&option2=M&variant=43915228774616",
		notes: "10.5 oz. ringspun cotton. Tubular T-shirt, No-Seam.",
		rating: "UNTESTED",
		specifications: "100% Cotton. Machine washable.",
	},
	{
		type: "T-Shirt",
		item: "Bronson L9 oz US Cotton Tubular T-Shirt",
		url: "https://bronsonshop.com/collections/short-sleeves/products/9-oz-us-cotton-ringspun-relaxed-fit-tubular-t-shirt-black?_pos=5&_fid=aaa74ecad&_ss=c&variant=40600251302083",
		notes: "9 oz. cotton jersey. Tubular T-shirt, No-Seam",
		rating: "UNTESTED",
		specifications: "100% Cotton. Machine washable.",
	},
	{
		type: "Pants",
		item: "Wrangler ATG™ Men's Cliff Side Utility Pant",
		url: "www.wrangler.com/shop/wrangler-atg-mens-cliff-side-utility-pant-NS849U.html?merchCategory=search&dwvar_NS849U_color=NS849ML",
		notes:
			"Cheap. Has a couple extra pockets. Lightweight and breathable. I don't find the material very comfortable.",
		rating: "B",
		specifications: "96% Nylon, 4% Spandex, 5.3 oz.",
	},
]);

const defaultColDef: ColDef = {
	flex: 1,
	resizable: true,
};
</script>

<template>
	<div style="width: 100%">
		<AgGridVue
			:columnDefs="columnDefs"
			:rowData="rowData"
			:defaultColDef="defaultColDef"
			:animateRows="true"
			:dom-layout="'autoHeight'"
			:theme="myTheme"
		/>
	</div>
</template>
