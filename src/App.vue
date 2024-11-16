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
    <glassmorphism-card
        title="Interactive background"
        description="Options:"
    >
        <div class="field">
            <label class="custom-label">
                <input class="custom-checkbox" type="checkbox" v-model="noise">
                Noise
            </label>
            <label class="custom-label">
                <input class="custom-range" type="range" min="0" max="1" step=".1" v-model.number="noiseOpacity">
                <input class="custom-number" type="number" min="0" max="1" step=".1" v-model.number="noiseOpacity"/>
                Opacity
            </label>
        </div>
        <div class="field">
            <label class="custom-label">
                <input class="custom-checkbox" type="checkbox" v-model="blur">
                Goo Blur
            </label>
        </div>
        <div class="field">
            <label class="custom-label">
                <input class="custom-checkbox" type="checkbox" v-model="showInteractiveBubble">
                {{ showInteractiveBubble ? 'Show' : 'Hide' }} interactive bubble
            </label>
        </div>
        <div class="bubbles">
            <h3>Bubbles:</h3>
            <div v-for="(bubble, b) in bubbles" :key="b" class="field">
                <label class="custom-label">#{{ b + 1 }}</label>
                <label class="custom-label">
                    <input class="custom-checkbox" type="checkbox" v-model="bubble.enabled">
                    &nbsp;
                </label>
                <label class="custom-label">
                    Duration
                    <input class="custom-range" type="range" min="5" max="60" step="5" v-model.number="bubble.animationDuration"  :disabled="!bubble.enabled">
                    <input class="custom-number" type="number" min="5" max="60" step="5" v-model.number="bubble.animationDuration"  :disabled="!bubble.enabled"/>
                </label>
                <label>
                    <select class="custom-select" v-model="bubble.animation" :disabled="!bubble.enabled">
                        <option value="moveInCircle">Move in circle</option>
                        <option value="moveVertical">Move vertical</option>
                        <option value="moveHorizontal">Move horizontal</option>
                    </select>
                </label>
            </div>
        </div>
    </glassmorphism-card>
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
    }

    .custom-label {
        @apply text-lg font-medium text-white mb-2;
    }

    .custom-checkbox {
        @apply appearance-none h-5 w-5 bg-white text-blue-600 rounded-md border-2 border-blue-500 focus:ring focus:ring-blue-300;
    }
    .custom-checkbox:checked {
        @apply relative border-white bg-blue-500
    }
    .custom-checkbox:checked:after {
        @apply absolute text-xs font-black text-white w-full h-full flex items-center justify-center;
        content: '√';
    }

    .custom-range {
        @apply appearance-none h-2 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-25;
    }
    .custom-range::-webkit-slider-thumb {
        @apply appearance-none h-5 w-5 bg-blue-500 rounded-full cursor-pointer;
    }
    .custom-range::-moz-range-thumb {
        @apply h-5 w-5 bg-blue-500 rounded-full cursor-pointer;
    }

    .custom-number {
        @apply w-full bg-white text-lg text-gray-700 text-end pl-2 py-0 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 disabled:opacity-25;
    }

    .custom-select {
        @apply w-full px-2 py-1 border border-gray-300 bg-white rounded-md shadow-sm text-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 disabled:opacity-35;
    }
}

.bubbles {
    @apply flex flex-col gap-2 divide-y divide-white/25;

    .field {
        @apply pt-2 items-start gap-4;
    }
}
</style>
