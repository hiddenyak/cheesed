<script setup>
import CheeseMan from "../components/CheeseMan.vue";
</script>

<template>
	<div class="home-container">
		<h1>Welcome to cheesed.net</h1>
		<p>Gotta get good.</p>
		<CheeseMan />
		<img
			src="https://visitor-badge.laobi.icu/badge?page_id=https://cheesed.net/"
			alt="visitor badge"
			style="margin-top: 20px"
		/>
	</div>
</template>

<style scoped>
.home-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	text-align: center;
	min-height: calc(100vh - 100px);
	padding: 2rem;
	box-sizing: border-box;
	overflow-x: hidden;
}
</style>
