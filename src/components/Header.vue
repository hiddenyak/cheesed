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
	position: sticky;
	top: 1rem;
	z-index: 1000;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1); /* optional */
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
