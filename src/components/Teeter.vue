<template>
  <div class="teeter">
    <div 
      class="beam p-relative" 
      :style="[ beamBalance ]"
    >
      <div>
        <Figure
          v-for="figure in figuresLeft"
          :key="figure.id"
          :figure="figure"
        />
        <div 
          class="pseudo-position pseudo-position__left p-absolute"
          :style="{ 'left': `${leftTarget}%` }"
        ></div>
      </div>
      <div>
        <Figure
          v-for="figure in figuresRight"
          :key="figure.id"
          :figure="figure"
        />
        <div 
          class="pseudo-position pseudo-position__right p-absolute"
          :style="{ 'left': `${rightTarget}%` }"
        ></div>
      </div>
    </div>
    <div class="triangle"></div>
  </div>
</template>

<script>
import Figure from '@/components/Figure.vue';

export default {
  components: {
    Figure
  },
  props: ['figuresLeft', 'figuresRight', 'balance', 'leftTarget', 'rightTarget'],
  computed: {
    beamBalance () {
      return `transform: rotate(${this.balance}deg)`;
    }
  }
}
</script>