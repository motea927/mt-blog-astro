<template>
  <div class="flex flex-col items-center justify-center">
    <canvas
      ref="canvas"
      width="400"
      height="400"
      class="w-full max-w-[400px]"
    ></canvas>

    <div class="flex gap-2 p-4">
      <button
        v-for="(button, key) in buttons"
        :key="key"
        class="p-2 bg-gray-300 rounded-md"
        @click="button.onClick"
      >
        {{ button.text }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Rive, Layout } from "@rive-app/canvas";
import { onMounted, ref } from "vue";

const canvas = ref<HTMLCanvasElement | null>(null);
let truck: Rive;

const buttons = ref({
  idle: {
    text: "開車",
    onClick: () => {
      if (!truck) {
        throw new Error("truck not found.");
      }

      const isPlaying = truck.playingAnimationNames.includes("idle");
      buttons.value.idle.text = isPlaying ? "開車" : "停車";
      isPlaying ? truck.pause("idle") : truck.play("idle");
    },
  },
  windshield_wipers: {
    text: "開雨刷",
    onClick: () => {
      if (!truck) {
        throw new Error("truck not found.");
      }

      const isPlaying =
        truck.playingAnimationNames.includes("windshield_wipers");
      buttons.value.windshield_wipers.text = isPlaying ? "開雨刷" : "關雨刷";
      isPlaying
        ? truck.pause("windshield_wipers")
        : truck.play("windshield_wipers");
    },
  },
});

onMounted(() => {
  if (!canvas.value) {
    throw new Error("canvas not found");
  }

  truck = new Rive({
    canvas: canvas.value,
    src: "https://cdn.rive.app/animations/vehicles.riv",
    artboard: "Jeep",
    onLoad: () => {
      truck.resizeDrawingSurfaceToCanvas();
    },
  });
});
</script>
