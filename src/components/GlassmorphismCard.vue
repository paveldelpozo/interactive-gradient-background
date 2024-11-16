<script setup lang="ts">
interface Props {
    title: string,
    description: string,
}
const props = defineProps<Props>()
</script>

<template>
    <div v-if="props.title && props.description" class="card">
        <svg
            viewBox="0 0 100% 100%"
            xmlns='http://www.w3.org/2000/svg'
            class="noise"
        >
            <filter id='noiseFilter'>
                <feTurbulence
                    type='fractalNoise'
                    baseFrequency='0.85'
                    numOctaves='6'
                    stitchTiles='stitch' />
            </filter>

            <rect
                width='100%'
                height='100%'
                preserveAspectRatio="xMidYMid meet"
                filter='url(#noiseFilter)' />
        </svg>
        <div class="content">
            <h1>{{ props.title }}</h1>
            <p>{{ props.description }}</p>
            <div class="slot"><slot></slot></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    user-select: none;
    max-width: 50vw;
    padding: 48px;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    box-shadow:
        0 2px 10px rgba(0, 0, 0, .05),
        0 4px 90px rgba(0, 0, 0, .1);
    overflow: hidden;
    color:#FFF;
    &:before {
        content: "";
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: rgb(255,255,255);
        background: linear-gradient(90deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,1) 34%,
            rgba(255,255,255,1) 89%,
            rgba(255,255,255,0) 100%
        );
        opacity: 0.3;
        filter: blur(.5px);
        mix-blend-mode: hard-light;
    }

    .noise {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 1;
        opacity: 0.1;
    }

    .content {
        position: relative;
        z-index: 2;
        text-shadow: -3px 0px 2px rgba(0,0,0,0.1);

        .slot {
            @apply py-4 px-0 flex flex-col gap-2;
        }
    }
}

h1, h2, h3 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
}

h1 {
    font-size: 3rem;
    margin-bottom: 16px;
}

p {
    line-height: 1.6;
}
</style>
