<script setup lang="ts">
import {computed, onBeforeUnmount, onMounted, ref} from "vue";

const props = withDefaults(defineProps<{
    color: string
    opacity?: number
    size?: number|string
}>(), {
    size: '100%',
    opacity: 1,
})

const mouse = ref({x: 0, y: 0})
const cursor = ref({x: 0, y: 0})

const posX = computed(() => {
    return `${Math.round(cursor.value.x)}px`
})

const posY = computed(() => {
    return `${Math.round(cursor.value.y)}px`
})

const move = () => {
    cursor.value.x += (mouse.value.x - cursor.value.x) / 20;
    cursor.value.y += (mouse.value.y - cursor.value.y) / 20;
    requestAnimationFrame(move);
}

const mouseMoveHandler = (event) => {
    mouse.value = {
        x: event.clientX,
        y: event.clientY,
    }
}

onMounted(() => {
    window.addEventListener('mousemove', mouseMoveHandler)
    move();
})

onBeforeUnmount(() => {
    window.removeEventListener('mousemove', mouseMoveHandler)
})
</script>

<template>
    <div
        ref="interactive"
        class="radial-gradient-interactive"
        :style="`
            --color: ${props.color};
            --size: ${props.size};
            --opacity: ${props.opacity};
            --pos-x: ${posX};
            --pos-y: ${posY};
        `"
    ></div>
</template>

<style scoped lang="scss">
.radial-gradient-interactive {
    position: absolute;
    background: radial-gradient(circle at center, rgba(var(--color), 0.8) 0, rgba(var(--color), 0) 50%) no-repeat;
    mix-blend-mode: var(--blending);

    width: var(--size);
    height: var(--size);
    top: -50%;
    left: -50%;

    opacity: var(--opacity);
    transform: translate(var(--pos-x), var(--pos-y));
}
</style>
