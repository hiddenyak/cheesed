<script setup>
import Header from "./components/Header.vue";
</script>

<template>
	<Header />
	<main>
		<router-view />
	</main>
</template>

<style>
main {
	box-sizing: border-box;
}
</style>
