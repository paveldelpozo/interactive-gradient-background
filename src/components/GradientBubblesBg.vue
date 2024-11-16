<script setup lang="ts">
import NoiseBg from "@/components/SVGFilters/NoiseBg.vue";
import RadialGradientBubbleInteractive from "@/components/RadialGradientBubbleInteractive.vue";
import GooBlur from "@/components/SVGFilters/GooBlurBg.vue";
import RadialGradientBubble from "@/components/RadialGradientBubble.vue";

interface Props {
    noise: boolean
    noiseOpacity: number
    blur: boolean
    bubbles: RadialGradientBubble[]
    colorFrom?: string
    colorTo?: string
    bgGradientDirection?: string
    interactiveBubbleColor: string
    showInteractiveBubble?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    colorFrom: 'rgb(8, 10, 15)',
    colorTo: 'rgb(0, 17, 32)',
    bgGradientDirection: '40deg',
    showInteractiveBubble: true
})
</script>

<template>
    <div
        class="gradient-bg"
        :style="`
            --color-from: ${props.colorFrom};
            --color-to: ${props.colorTo};
            --bg-gradient-direction: ${props.bgGradientDirection};
        `"
    >
        <noise-bg v-if="props.noise" :opacity="props.noiseOpacity"/>
        <goo-blur v-if="props.blur" />
        <div class="gradients-container">
            <template
                v-for="(bubble, b) in props.bubbles"
                :key="b"
            >
                <radial-gradient-bubble
                    v-if="bubble.enabled"
                    :color="bubble.color"
                    :circle-size="bubble.circleSize"
                    :origin="bubble.origin"
                    :animation="bubble.animation"
                    :animation-duration="bubble.animationDuration"
                    :animation-mode="bubble.animationMode"
                    :opacity="bubble.opacity"
                />
            </template>
            <radial-gradient-bubble-interactive
                v-if="props.showInteractiveBubble"
                :color="props.interactiveBubbleColor"
                size="100%"
                :opacity="1"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.gradient-bg {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    background: linear-gradient(var(--bg-gradient-direction), var(--color-from), var(--color-to));

    .gradients-container {
        filter: url(#goo) blur(40px) ;
        width: 100%;
        height: 100%;
    }
}
</style>
