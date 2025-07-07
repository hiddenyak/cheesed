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
	padding: 1rem;
	box-sizing: border-box;
}
</style>
