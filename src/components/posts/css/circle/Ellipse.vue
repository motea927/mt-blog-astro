<template>
  <div class="ellipse">
    <label for="count">
      輸入個數：
      <input
        id="count"
        min="1"
        type="number"
        place="輸入個數"
        v-model="count"
      />
    </label>

    <label for="deg">
      輸入起始角度：
      <input
        id="deg"
        type="number"
        step="30"
        place="起始位置"
        v-model="startDeg"
      />
    </label>

    <div class="example-ellipse">
      <div
        v-for="i in count"
        :key="i"
        class="example-ellipse__item"
        :style="getStyle(i - 1)"
      >
        {{ i }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const count = ref(1);
const startDeg = ref(-90);

const getStyle = (index: number) => {
  const calcDeg = startDeg.value + (index / count.value) * 360;

  return {
    transform: `
        rotate(${calcDeg}deg) 
        translate(10rem) 
        rotate(${calcDeg * -1}deg) 
        scaleY(2)
      `,
  };
};
</script>

<style lang="scss" scoped>
input {
  border: 1px solid;
  border-radius: 4px;
  padding: 4px;
  margin-bottom: 20px;
}

label {
  display: block;
}

.example-ellipse {
  width: 20rem;
  height: 20rem;
  border: 1px solid;
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
  transform: scaleY(0.5);

  &__item {
    border: 1px solid;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;

    // for text
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
