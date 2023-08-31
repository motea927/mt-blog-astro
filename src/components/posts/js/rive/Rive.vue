<template>
  <div class="flex justify-center">
    <canvas
      ref="canvas"
      width="400"
      height="400"
      class="w-full max-w-[400px]"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { Rive } from "@rive-app/canvas";
import { onMounted, ref } from "vue";

const canvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (!canvas.value) {
    throw new Error("canvas not found");
  }

  const rive = new Rive({
    canvas: canvas.value,
    src: "https://cdn.rive.app/animations/vehicles.riv",
    autoplay: true,
    onLoad: () => {
      rive.resizeDrawingSurfaceToCanvas();
    },
  });
});
</script>
