<script setup lang="ts">
import type {RadialGradientProps} from "@/interfaces/RadialGradientProps";
import {computed} from "vue";

const props = withDefaults(defineProps<RadialGradientProps>(), {
    origin: 'center center',
    opacity: 1,
    enabled: true
})

const duration = computed(() => {
    return `${props.animationDuration}s`
})
</script>

<template>
    <div
        class="radial-gradient"
        :style="`
            --color: ${props.color};
            --size: ${props.circleSize};
            --origin: ${props.origin};
            --animation: ${props.animation};
            --animation-duration: ${duration};
            --animation-mode: ${props.animationMode};
            --opacity: ${props.opacity};
        `"
    ></div>
</template>

<style scoped lang="scss">
.radial-gradient {
    position: absolute;
    background: radial-gradient(circle at center, rgba(var(--color), 0.8) 0, rgba(var(--color), 0) 50%) no-repeat;
    mix-blend-mode: var(--blending);

    width: var(--size);
    height: var(--size);
    top: calc(50% - var(--size) / 2);
    left: calc(50% - var(--size) / 2);

    transform-origin: var(--origin);

    animation-name: var(--animation);
    animation-duration: var(--animation-duration);
    animation-direction: var(--animation-mode);
    animation-iteration-count: infinite;

    opacity: var(--opacity);
}
</style>
