<template>
	<nav class="header">
		<router-link to="/">Home</router-link>
		<router-link to="/equipment">Equipment</router-link>
	</nav>
</template>

<style scoped>
.header {
	display: flex;
	gap: 1rem;
	padding: 1rem;
	background: #333842;
	margin-bottom: 10px;
}
a {
	color: white;
	text-decoration: none;
}
.router-link-active {
	font-weight: bold;
	text-decoration: underline;
}
</style>
