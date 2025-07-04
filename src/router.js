import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Equipment from "./pages/Equipment.vue";

const routes = [
	{ path: "/", component: Home },
	{ path: "/equipment", component: Equipment },
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
