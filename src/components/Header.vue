<template>
	<nav class="header">
		<router-link to="/">HOME</router-link>
		<router-link to="/equipment">STASH</router-link>
		<router-link to="/zero-drag">ZERO_DRAG</router-link>
	</nav>
</template>

<style scoped>
.header {
	display: flex;
	gap: 2rem;
	padding: 1rem;
	background: #333842;
	margin-bottom: 10px;
	position: sticky;
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
