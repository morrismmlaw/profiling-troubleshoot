<template>

    <div>
        <NuxtParticles id="tsparticles" :options="TSoptions" />
    </div>

</template>

<script lang="ts" setup>

import { loadFull } from 'tsparticles'
import { tsParticles } from '@tsparticles/engine'

const { mode } = useRuntimeConfig().public.particles

const show = ref(true)

if (import.meta.client && mode === 'custom') {
    await loadFull(tsParticles)
}

const TSoptions = {
    fullScreen: {
        enable: true,
        zIndex: -1
    },
    particles: {
        color: {
            value: "#c9a0a0"
        },
        links: {
            color: "#ff0000",
            enable: true
        },
        move: {
            enable: true
        },
        number: {
            value: 70
        }
    }
}
</script>

<style scoped></style>