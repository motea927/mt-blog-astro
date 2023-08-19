<template>
  <div class="animation-ellipse">
    <div class="animation-ellipse__item">1</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scope>
.animation-ellipse {
  width: 20rem;
  height: 20rem;
  border: 1px solid;
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
  transform: scaleY(0.5) skewY(35deg);

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
    transform: skewY(-35deg) rotate(-90deg) translate(10rem) rotate(90deg)
      scaleY(2);
    animation: 3s round linear infinite;

    // for text
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @keyframes round {
    from {
      transform: rotate(-90deg) translate(10rem) rotate(90deg) skewY(-35deg)
        scaleY(2);
    }
    to {
      transform: rotate(270deg) translate(10rem) rotate(-270deg) skewY(-35deg)
        scaleY(2);
    }
  }
}
</style>
