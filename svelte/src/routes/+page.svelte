<script>
	import { onMount } from 'svelte';

	$: secondsDegrees = 0;
	$: minsDegrees = 0;
	$: hourDegrees = 0;

	function setDate() {
		const now = new Date();

		const seconds = now.getSeconds();
		secondsDegrees = (seconds / 60) * 360 + 90;

		const mins = now.getMinutes();
		minsDegrees = (mins / 60) * 360 + (seconds / 60) * 6 + 90;

		const hour = now.getHours();
		hourDegrees = (hour / 12) * 360 + (mins / 60) * 30 + 90;
		console.log(hourDegrees);
	}

	onMount(() => {
		const interval = setInterval(() => {
			setDate();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div class="clock">
	<div class="outer-clock-face">
		<div class="marking marking-one" />
		<div class="marking marking-two" />
		<div class="marking marking-three" />
		<div class="marking marking-four" />
		<div class="inner-clock-face">
			<div class="hand hour-hand" style="transform:rotate({hourDegrees}deg)" />
			<div class="hand min-hand" style="transform:rotate({minsDegrees}deg)" />
			<div class="hand second-hand" style="transform:rotate({secondsDegrees}deg)" />
		</div>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		font-size: 2rem;
		display: flex;
		flex: 1;
		min-height: 100vh;
		align-items: center;
		justify-content: center;
		background: #282828;
		text-align: center;
		font-size: 10px;
	}
	.clock {
		width: 30rem;
		height: 30rem;
		border: 7px solid #282828;
		box-shadow: -4px -4px 10px rgba(67, 67, 67, 0.5), inset 4px 4px 10px rgba(0, 0, 0, 0.5),
			inset -4px -4px 10px rgba(67, 67, 67, 0.5), 4px 4px 10px rgba(0, 0, 0, 0.3);
		border-radius: 50%;
		margin: 50px auto;
		position: relative;
		padding: 2rem;
	}

	.outer-clock-face {
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 100%;
		background: #282828;

		overflow: hidden;
	}

	.outer-clock-face::after {
		transform: rotate(90deg);
	}

	.outer-clock-face::before,
	.outer-clock-face::after,
	.outer-clock-face .marking {
		content: '';
		position: absolute;
		width: 5px;
		height: 100%;
		background: #1df52f;
		z-index: 0;
		left: 49%;
	}

	.outer-clock-face .marking {
		background: #bdbdcb;
		width: 3px;
	}

	.outer-clock-face .marking.marking-one {
		transform: rotate(30deg);
	}

	.outer-clock-face .marking.marking-two {
		transform: rotate(60deg);
	}

	.outer-clock-face .marking.marking-three {
		transform: rotate(120deg);
	}

	.outer-clock-face .marking.marking-four {
		transform: rotate(150deg);
	}

	.inner-clock-face {
		position: absolute;
		top: 10%;
		left: 10%;
		width: 80%;
		height: 80%;
		background: #282828;
		border-radius: 100%;
		z-index: 1;
	}

	.inner-clock-face::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 16px;
		height: 16px;
		border-radius: 18px;
		margin-left: -9px;
		margin-top: -6px;
		background: #4d4b63;
		z-index: 11;
	}

	.hand {
		width: 50%;
		right: 50%;
		height: 6px;
		background: #61afff;
		position: absolute;
		top: 50%;
		border-radius: 6px;
		transform-origin: 100%;
		transform: rotate(90deg);
		transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
	}

	.hand.hour-hand {
		width: 30%;
		z-index: 3;
	}

	.hand.min-hand {
		height: 3px;
		z-index: 10;
		width: 40%;
	}

	.hand.second-hand {
    background: #ee791a;
		width: 45%;
		height: 2px;
	}
</style>
