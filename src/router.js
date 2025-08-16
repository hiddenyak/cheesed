import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Equipment from "./pages/Equipment.vue";
import TimeSaves from "./components/TimeSavesGrid.vue";
import Wishlist from "./components/WishList.vue";
import PhotonThrowers from "./components/PhotonThrowers.vue";

const routes = [
	{ path: "/", component: Home },
	{ path: "/equipment", component: Equipment },
	{ path: "/wish-list", component: Wishlist },
	{ path: "/zero-drag", component: TimeSaves },
	{ path: "/photon-throwers", component: PhotonThrowers },
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
