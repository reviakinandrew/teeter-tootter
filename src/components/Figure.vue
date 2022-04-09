<template>
  <div 
    class="figure p-absolute"
    :class="[ classForm, classTransition, classSide ]"
    :style="[ styleColor, styleSizes, stylePositionX, stylePositionY ]"
  >
    <div 
      v-if="figure.weight > 1"
      class="figure__weight p-absolute"
      :class="{ 'abs-center-x' : figure.form === 'triangle' }"
      :style="styleWeight"
    >
      <span class="p-absolute abs-center">{{ figure.weight }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    figure: {
      form: String,
      color: Number || String,
      weight: Number || String
    },
    transition: {
      default: false
    },
    isMoving: {
      default: false
    },
    classSide: {
      default: null
    }
  },
  computed: {
    figureId () {
      return this.figure.id;
    },
    classForm () {
      return `figure__${this.figure.form}`
    },
    classTransition () {
      if (this.transition) return 'transition';
      else return '';
    },
    figureWidth () {
      if (this.figure.form === 'triangle') return this.figure.weight * 6;
      return this.figure.weight * 10;
    },
    figureHeight () {
      const form = this.figure.form;
      switch(form) {
        case 'triangle':
          return this.figure.weight * 9;
        case 'rectangle':
          return this.figure.weight * 6;
        case 'circle':
          return this.figure.weight * 10;
      }
    },
    styleColor () {
      if (this.figure.form === 'triangle') return `border-color: ${this.figure.color}`;
      else return `background-color: ${this.figure.color}`;
    },
    styleSizes () {
      const form = this.figure.form;
      switch(form) {
        case 'triangle':
          return `border-left-width: ${this.figureWidth}px;
                  border-right-width: ${this.figureWidth}px;
                  border-bottom-width: ${this.figureHeight}px;`
        default:
          return `width: ${this.figureWidth}px;
                  height: ${this.figureHeight}px;`
      }
    },
    styleWeight () {
      if (this.figure.form === 'triangle') return `width: ${this.figure.weight * 12}px; height: ${this.figure.weight * 11}px;`;
      else return `width: 100%; height: 100%;`;
    },
    stylePositionX () {
      let ind = 5;
      if (this.figure.form === 'triangle') ind = 6;
      return `left: calc(${this.figure.positionX}% - ${this.figure.weight * ind}px)`;
    },
    stylePositionY () {
      if (this.isMoving) return `top: calc(${this.figure.positionY}px - ${this.figureHeight}px)`;
      else return `top: calc(0px - ${this.figureHeight}px)`;
    }
  }
}
</script>