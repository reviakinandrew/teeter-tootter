<template>
  <div 
    class="game-over p-fixed" 
    :class="{ 'animate': animate }"
  >
    <img class="p-absolute abs-center" src="@/assets/folks.png" />
  </div>
</template>

<script>
export default {
  props: {
    animate: { default: false }
  }
}
</script>

<style lang="scss" scoped>
  .game-over {
    z-index: 100;
    width: 100%;
    height: 100%;
    transition: 0.5s all ease;
    left: 0;
    bottom: -100%;
    background-color: #004b88;
    
    &.animate {
      left: 0;
      bottom: 0;
    }
  }
</style>