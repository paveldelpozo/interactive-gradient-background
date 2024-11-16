<script setup lang="ts">
interface Props {
    opacity?: number,
}
const props = withDefaults(defineProps<Props>(), {
    opacity: 0.3,
})
</script>

<template>
    <svg
        viewBox="0 0 100vw 100vw"
        xmlns='http://www.w3.org/2000/svg'
        class="noiseBg"
        :style="`--opacity: ${props.opacity}`"
    >
        <filter id='noiseFilterBg'>
            <feTurbulence
                type='fractalNoise'
                baseFrequency='0.6'
                stitchTiles='stitch' />
        </filter>

        <rect
            width='100%'
            height='100%'
            preserveAspectRatio="xMidYMid meet"
            filter='url(#noiseFilterBg)'
        />
    </svg>
</template>

<style lang="scss">
.noiseBg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    mix-blend-mode: soft-light;
    opacity: var(--opacity);
}
</style>
