<template>
	<nav class="header">
		<router-link to="/">HOME</router-link>
		<router-link to="/equipment">STASH</router-link>
		<router-link to="/wish-list">WISH_LIST</router-link>
		<router-link to="/zero-drag">ZERO_DRAG</router-link>
		<router-link to="/photon-throwers">PHOTON_THROWERS</router-link>
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
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
	overflow-x: auto; /* allows scrolling */
	white-space: nowrap; /* keeps links in one line */
	-webkit-overflow-scrolling: touch; /* smooth scrolling on iOS */
	top: 0;
}
a {
	color: white;
	text-decoration: none;
	padding: 0.5rem 0;
}
.router-link-active {
	font-weight: bold;
	text-decoration: underline;
}
</style>
