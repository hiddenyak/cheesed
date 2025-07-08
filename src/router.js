import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Equipment from "./pages/Equipment.vue";
import TimeSaves from "./components/TimeSavesGrid.vue";

const routes = [
	{ path: "/", component: Home },
	{ path: "/equipment", component: Equipment },
	{ path: "/zero-drag", component: TimeSaves },
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
