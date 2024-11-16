<script setup lang="ts">
import {ref} from "vue";
import type {RadialGradientProps} from "@/interfaces/RadialGradientProps";
import GlassmorphismCard from "@/components/GlassmorphismCard.vue";
import GradientBubblesBg from "@/components/GradientBubblesBg.vue";

const noise = ref(false)
const noiseOpacity = ref(.9)
const blur = ref(false)
const showInteractiveBubble = ref(true)

const bubbles = ref<RadialGradientProps[]>([
    {
        color: '18, 113, 255',
        circleSize: '80%',
        origin: 'center center',
        animation: 'moveVertical',
        animationDuration: 30,
        animationMode: 'ease',
        opacity: 1,
        enabled: true
    },
    {
        color: '107, 74, 255',
        circleSize: '80%',
        origin: 'calc(50% - 400px)',
        animation: 'moveInCircle',
        animationDuration: 20,
        animationMode: 'reverse',
        opacity: 1,
        enabled: true
    },
    {
        color: '100, 100, 255',
        circleSize: '80%',
        origin: 'calc(50% + 400px)',
        animation: 'moveInCircle',
        animationDuration: 40,
        animationMode: 'linear',
        opacity: 1,
        enabled: true
    },
    {
        color: '50, 160, 220',
        circleSize: '80%',
        origin: 'calc(50% - 200px)',
        animation: 'moveHorizontal',
        animationDuration: 40,
        animationMode: 'ease',
        opacity: .7,
        enabled: true
    },
    {
        color: '80, 47, 122',
        circleSize: '80%',
        origin: 'calc(50% - 800px) calc(50% + 200px)',
        animation: 'moveInCircle',
        animationDuration: 20,
        animationMode: 'ease',
        opacity: 1,
        enabled: true
    },
])
</script>

<template>
    <GlassmorphismCard
        title="Interactive background"
        description="Options:"
    >
        <div class="field">
            <label>
                <input type="checkbox" v-model="noise">
                Noise
            </label>
            <label>
                <input type="range" min="0" max="1" step=".1" v-model.number="noiseOpacity">
                <input type="number" min="0" max="1" step=".1" v-model.number="noiseOpacity"/>
                Opacity
            </label>
        </div>
        <div class="field">
            <label>
                <input type="checkbox" v-model="blur">
                Goo Blur
            </label>
        </div>
        <div class="field">
            <label>
                <input type="checkbox" v-model="showInteractiveBubble">
                {{ showInteractiveBubble ? 'Show' : 'Hide' }} interactive bubble
            </label>
        </div>
        <div class="bubbles">
            <h3>Bubbles:</h3>
            <div v-for="(bubble, b) in bubbles" :key="b" class="field">
                <h3>#{{ b + 1 }}</h3>
                <label>
                    <input type="checkbox" v-model="bubble.enabled">
                    Enabled
                </label>
                <label>
                    <input type="range" min="5" max="60" step="5" v-model.number="bubble.animationDuration">
                    <input type="number" min="5" max="60" step="5" v-model.number="bubble.animationDuration"/>
                    Duration
                </label>
                <label>
                    <select v-model="bubble.animation" :disabled="!bubble.enabled">
                        <option value="moveInCircle">Move in circle</option>
                        <option value="moveVertical">Move vertical</option>
                        <option value="moveHorizontal">Move horizontal</option>
                    </select>
                </label>
            </div>
        </div>
    </GlassmorphismCard>
    <gradient-bubbles-bg
        :noise="noise"
        :noise-opacity="noiseOpacity"
        :blur="blur"
        :bubbles="bubbles"
        color-from="rgb(0, 0, 0)"
        color-to="rgb(64, 64, 128)"
        bg-gradient-direction="160deg"
        interactive-bubble-color="140, 100, 255"
        :show-interactive-bubble="showInteractiveBubble"
    />
</template>

<style lang="scss">
.field {
    @apply flex flex-row gap-4 items-center justify-between w-full;

    label {
        @apply flex flex-row gap-2 items-center justify-start;

        input, select {
            @apply text-gray-800;
        }
        input[type=number] {
            @apply text-end;
        }
    }
}


</style>
