<template>
	<img
		src="/cheese_man.webp"
		alt="Cheese Man"
		class="cheese-man"
		:style="{ transform: `scale(${cheeseSize})` }"
		title="Level up Cheese Man!"
		@click="levelUpCheese"
		@mousedown="startHold"
		@mouseup="cancelHold"
		@mouseleave="cancelHold"
		@touchstart="startHold"
		@touchend="cancelHold"
	/>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import confetti from "canvas-confetti";

const cheeseSize = ref(1);
const powerupAudio = new Audio("/powerup.mp3");

onMounted(() => {
	const saved = localStorage.getItem("cheeseSize");
	if (saved) cheeseSize.value = parseFloat(saved);
	listenForKonami();
});

function levelUpCheese(event: MouseEvent) {
	cheeseSize.value += 0.2;
	localStorage.setItem("cheeseSize", cheeseSize.value.toString());
	powerupAudio.currentTime = 0;
	powerupAudio.play();

	fireConfetti(event.clientX, event.clientY);

	// 🎯 Special milestone blasts
	if ([10, 20, 50, 100].includes(Math.floor(cheeseSize.value))) {
		fireConfetti(event.clientX, event.clientY, true); // big blast
	}
}

function resetCheese() {
	cheeseSize.value = 1;
	localStorage.setItem("cheeseSize", "1");
	alert("Cheese Man has been reset 🔄🧀");
}

function fireConfetti(x: number, y: number, big = false) {
	const origin = {
		x: x / window.innerWidth,
		y: y / window.innerHeight,
	};

	confetti({
		particleCount: big ? 200 : 80,
		spread: big ? 120 : 70,
		origin,
		angle: 90,
		scalar: big ? 1.8 : 1.2,
		ticks: 100,
		colors: ["#fbc02d", "#fff176", "#ffd54f"], // 🧀 palette
	});
}

function listenForKonami() {
	const code = [
		"ArrowUp",
		"ArrowUp",
		"ArrowDown",
		"ArrowDown",
		"ArrowLeft",
		"ArrowRight",
		"ArrowLeft",
		"ArrowRight",
		"b",
		"a",
	];
	let index = 0;
	window.addEventListener("keydown", (e) => {
		if (e.key === code[index]) {
			index++;
			if (index === code.length) {
				resetCheese();
				index = 0;
			}
		} else {
			index = 0;
		}
	});
}

let holdTimeout: number | undefined;

function startHold() {
	holdTimeout = window.setTimeout(() => {
		resetCheese();
	}, 1000);
}

function cancelHold() {
	clearTimeout(holdTimeout);
}
</script>

<style scoped>
.cheese-man {
	transition: transform 0.3s ease;
	cursor: pointer;
	margin-top: 20px;
	max-width: 300px;
	max-height: 100vh;
	display: block;
	transform-origin: top center;
}
</style>
