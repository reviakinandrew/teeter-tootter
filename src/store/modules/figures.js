import { generateFigure, compareBalance } from "@/utils/helpers"

function figuresState () {
  return {
    figuresLeft: [],
    figuresRight: [],
    transitionLeft: true,
    transitionRight: true,
    figureLeftDom: null,
    figureRightDom: null,
    beamDom: null
  }
}

export default {
  state: figuresState(),
  getters: {
    getFiguresLeft (state) { return state.figuresLeft },
    getFiguresRight (state) { return state.figuresRight },
    getLastFigureLeft (state) {
      return { ...state.figuresLeft[state.figuresLeft.length - 1] }
    },
    getLastFigureRight (state) {
      return { ...state.figuresRight[state.figuresRight.length - 1] }
    },
    getTeeterFiguresLeft (state) {
      return state.figuresLeft.filter((figure, index) => index !== (state.figuresLeft.length - 1)) || [];
    },
    getTeeterWeightLeft (state, getters) {
      return compareBalance(getters.getTeeterFiguresLeft, 'left');
    },
    getTeeterWeightRight (state, getters) {
      return compareBalance(getters.getTeeterFiguresRight, 'right');
    },
    getTeeterFiguresRight (state) {
      return state.figuresRight.filter((figure, index) => index !== (state.figuresRight.length - 1)) || [];
    },
    getTransitionLeft (state) { return state.transitionLeft },
    getTransitionRight (state) { return state.transitionRight },
    getFigureLeftDom (state) { return state.figureLeftDom },
    getFigureRightDom (state) { return state.figureRightDom },
    getBeamDom (state) { return state.beamDom }
  },
  mutations: {
    SET_ADD_FIGURE: (state, side) => {
      if (side === 'left') state.figuresLeft.push(generateFigure());
      else state.figuresRight.push(generateFigure());
    },
    SET_MOVE_FIGURE: (state, { value = 10, side = 'left', position = 'x' }) => {
      if (position === 'y') {
        let targetFigures;
        if (side === 'right') targetFigures = state.figuresRight;
        else targetFigures = state.figuresLeft;

        targetFigures[targetFigures.length - 1].positionY += value;
      } else {
        const figure = state.figuresLeft[state.figuresLeft.length - 1];
        const result = figure.positionX += value;
        if (result < 0) figure.positionX = 0;
        else if (result > 100) figure.positionX = 100;
        else figure.positionX = result;
      } 
    },
    SET_TRANSITION_LEFT: (state, bool) => { state.transitionLeft = bool },
    SET_TRANSITION_RIGHT: (state, bool) => { state.transitionRight = bool },
    SET_FIGURE_LEFT_DOM: (state, value) => { state.figureLeftDom = value },
    SET_FIGURE_RIGHT_DOM: (state, value) => { state.figureRightDom = value },
    SET_BEAM_DOM: (state, value) => { state.beamDom = value },
  },
  actions: {
    setAddFigure (ctx, side = 'left') {
      ctx.commit('SET_ADD_FIGURE', side);
      ctx.dispatch('setBalance');
    },
    setMoveFigure (ctx, info) {
      ctx.commit('SET_MOVE_FIGURE', info);
    },
    setTransitionLeft (ctx, bool) {
      ctx.commit('SET_TRANSITION_LEFT', bool);
    },
    setTransitionRight (ctx, bool) {
      ctx.commit('SET_TRANSITION_RIGHT', bool);
    },
    setFigureLeftDom (ctx, value) {
      ctx.commit('SET_FIGURE_LEFT_DOM', value);
    },
    setFigureRightDom (ctx, value) {
      ctx.commit('SET_FIGURE_RIGHT_DOM', value);
    },
    setBeamDom (ctx, value) {
      ctx.commit('SET_BEAM_DOM', value);
    },
    setResetFiguresState (ctx) {
      const resetFiguresState = figuresState();
      Object.keys(resetFiguresState).forEach(key => {
        ctx.state[key] = resetFiguresState[key]
      })
    }
  }
}