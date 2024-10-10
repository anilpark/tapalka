<script lang="ts">
	import mono from '$lib/assets/mono.png';
	import cat from '$lib/assets/cat.png';
	import ogo from '$lib/assets/ogo.png';
	import meow from '$lib/assets/meow.mp3';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let items: { x: number, y: number, rotation: number, id: number }[] = [];

	let audioPLaysCount = 0;
	let isPressed = false;
	let progress = 0;
	let finished = false;

	function playSound() {
		if (audioPLaysCount < 3) {
			audioPLaysCount++;

			const audio = new Audio(meow);
			audio.volume = 0.5;
			audio.playbackRate = 1;
			audio.play();

			setTimeout(() => {
				audioPLaysCount--;
			}, 1000);
		}
	}

	const interval = setInterval(() => {
		decreaseProgress();
	}, 100);

	function onFinished() {
		finished = true;
		clearInterval(interval);
	}

	function increaseProgress() {
		if (progress < 100) {
			progress += 3;
		} else {
			onFinished();
		}
	}


	function decreaseProgress() {
		if (progress > 0) {
			progress -= 0.5;
		}
	}

	function addElement({ pageX: x, pageY: y }: MouseEvent) {
		if (finished) return;

		const id = Date.now();
		items = [...items, { x, y, rotation: Math.random() * 360, id }];

		playSound();
		increaseProgress();

		setTimeout(() => {
			removeElement(id);
		}, 0);

		isPressed = true;
		setTimeout(() => {
			isPressed = false;
		}, 50);
	}


	function removeElement(id: number) {
		items = items.filter(item => item.id !== id);
	}
</script>

<div class="progress-container mt-2">
	<div class="ogo-wrapper" style:left='{progress}%'>
		<img src={ogo} alt="" class="ogo">
	</div>
	<div class="progress-bar" style:width="{progress}%" />
</div>

<button class="wrapper flex justify-center items-center mt-20 mx-auto scale-90" on:click={addElement}
				class:pressed={isPressed}
>
	<div class="coin rounded-full border-white border-4 border">
		<img class="rounded-full" src={mono} alt="">
	</div>

</button>

{#each items as item (item.id)}
	<div
		class="fly-element"
		style="transform: translaterotate({item.rotation}deg);left: {item.x}px; top: {item.y}px;"
		out:fly={{ y: -100, x: (Math.random() - 0.5) * 500, duration: 1000, easing: cubicOut }}
	>
		<img src={cat} alt="">
	</div>
{/each}

{#if finished}
	<p in:fly={{y: 100}} class="text-3xl text-center text-amber-50">Беремо і робимо!</p>
{/if}


<style>
    .wrapper {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        perspective: 500px;
        border-radius: 50%;
    }

    .pressed {
        transform: rotateX(10deg) rotateY(10deg) translateZ(-10px); /* 3D push effect */
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2); /* Shadow becomes softer */
    }

    .fly-element {
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    img {
        cursor: pointer;
    }

    .progress-container {
        position: relative;
        width: 100%;
        height: 50px;
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
        overflow: hidden;
    }

    .progress-bar {
        height: 50px;
        background-color: #4caf50;
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
        transition: width 0.2s ease;
    }

    .ogo-wrapper {
        position: absolute;
        top: 0;
        margin-left: -25px;
        background: white;
        border: 1px solid black;

        border-radius: 50%;
        overflow: hidden;
        transition: left 0.2s ease;
    }

    .ogo {
        max-width: 50px;
    }
</style>