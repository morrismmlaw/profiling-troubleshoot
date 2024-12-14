<template>

    <div>
        <NuxtParticles id="tsparticles" :options="TSoptions" />
        <!-- <NuxtParticles id="tsparticles" url="./particles.json" @load="onLoad"></NuxtParticles> -->

    </div>

</template>

<script lang="ts" setup>

import { loadFull } from 'tsparticles'
import {tsParticles } from '@tsparticles/engine'

import type { Container } from '@tsparticles/engine'

const { mode } = useRuntimeConfig().public.particles

const show = ref(true)

if (import.meta.client && mode === 'custom') {
    await loadFull(tsParticles)
}

const onLoad = (container: Container) => {
    // Do something with the container
    container.pause()
    setTimeout(() => container.play(), 2000)
}

const TSoptions = {
    fullScreen: {
        enable: true,
        zIndex: -1
    },
    particles: {
        color: {
            value: "#ffffff"
        },
        links: {
            color: "#fffff0",
            enable: true
        },
        move: {
            enable: true,
            speed: 2.5,
            random: true,
            straight: false,
            out_mode: "out",
            bounce: true,
            attract: { enable: true, rotateX: 600, rotateY: 1200 }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
        },
        size: {
            value: 3,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false, random: true }
        },
        number: {
            value: 200,
            density: { enable: true, value_area: 800 }
        },
        shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 },
            // image: { src: "img/github.svg", width: 100, height: 100 }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
    },
}

</script>

<style scoped></style>