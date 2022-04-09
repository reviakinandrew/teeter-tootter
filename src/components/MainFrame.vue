<template>
  <div class="main-frame p-relative">
    <div class="figures-container">
      <div class="p-relative">
        <Figure
          v-if="getFiguresLeft.length && getLastFigureLeft"
          :figure="getLastFigureLeft"
          :transition="getTransitionLeft"
          :isMoving="true"
          classSide="figure-left"
        />
      </div>
      <div class="p-relative">
        <Figure
          v-if="getFiguresRight.length && getLastFigureRight"
          :figure="getLastFigureRight"
          :transition="getTransitionRight"
          :isMoving="true"
          classSide="figure-right"
        />
      </div>
    </div>
    <Teeter 
      :figuresLeft="getTeeterFiguresLeft"
      :figuresRight="getTeeterFiguresRight"
      :balance="getBalance"
      :leftTarget="getLastFigureLeft.positionX"
      :rightTarget="getTransitionRight.positionX"
    />
  </div>
  <GameOver :animate="getGameOver" />
</template>

<script>
import Figure from '@/components/Figure.vue';
import Teeter from '@/components/Teeter.vue';
import GameOver from '@/components/GameOver.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: { 
    Figure,
    Teeter,
    GameOver
  },
  data () {
    return {
      figureLeftDom: null,
      figureRightDom: null,
      beamDom: null
    }
  },
  watch: {
    getPlaying () {
      if (this.getPlaying) window.addEventListener("keydown", this.moveFigure);
      else window.removeEventListener("keydown", this.moveFigure);
    },
    getBalance: {
      immediate: true,
      handler () {
        if (
          this.getBalance < -30 || 
          this.getBalance > 30 ||
          this.getTeeterWeightLeft <= -20 ||
          this.getTeeterWeightRight >= 20
        ) {
          this.setDestroyPlaying();
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'getPlaying', 
      'getFiguresLeft', 
      'getFiguresRight', 
      'getLastFigureLeft', 
      'getLastFigureRight',
      'getTeeterFiguresLeft',
      'getTeeterFiguresRight',
      'getBalance',
      'getTransitionLeft',
      'getTransitionRight',
      'getTeeterWeightLeft',
      'getTeeterWeightRight',
      'getGameOver'
    ])
  },
  methods: {
    ...mapActions([
      'setMoveFigure', 
      'setResetPlaying',
      'setDestroyPlaying'
    ]),

    moveFigure (side) {
      let value;
      if (side.code === 'ArrowLeft') value = -5;
      else if (side.code === 'ArrowRight') value = 5;  

      if (side.code === 'ArrowLeft' || side.code === 'ArrowRight') {
        this.setMoveFigure({ value });
      }
    }
  }
}
</script>