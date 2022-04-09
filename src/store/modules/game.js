import { getCollision } from "@/utils/helpers"

function gameState () {
  return {
    interval: null,
    playing: false,
    paused: false,
    speed: 1,
    balance: 0,
    speed: 10,
    gameOver: false
  }
}

export default {
  state: gameState(),
  getters: {
    getInterval (state) { return state.interval },
    getPlaying (state) { return state.playing },
    getPaused (state) { return state.paused },
    getBalance (state) { return state.balance },
    getSpeed (state) { return state.speed },
    getGameOver (state) { return state.gameOver }
  },
  mutations: {
    SET_PLAYING: (state, bool) => { 
      state.playing = bool;
      if (!state.playing) state.paused = false;
    },
    SET_PAUSED: (state, bool) => { state.paused = bool },
    SET_BALANCE: (state, value) => { state.balance = value },
    SET_SPEED: (state, value) => { state.speed += value },
    SET_GAME_OVER: (state, value) => { state.gameOver = value }
  },
  actions: {
    setIntervalProcess (ctx, func) {
      ctx.state.interval = setInterval(function () { func() }, 100);
    },
    setClearInterval (ctx) {
      if (ctx.state.interval) clearInterval(ctx.state.interval);
    },
    setPlaying ({ state, getters, commit, dispatch }) {
      commit('SET_PLAYING', true);
      if (!getters.getFiguresLeft.length && !getters.getFiguresRight.length) {
        dispatch('setAddFigure', 'left');
        dispatch('setAddFigure', 'right');
      }

      dispatch('setIntervalProcess', () => {
        ['left', 'right'].forEach(side => {
          dispatch('setMoveFigure', { 
            value: getters.getSpeed, 
            position: 'y',
            side
          })
        })
        const figureLeftDom = document.querySelector('.figure-left');
        const figureRightDom = document.querySelector('.figure-right');
        const pseudoLeftDom = document.querySelector('.pseudo-position__left');
        const pseudoRightDom = document.querySelector('.pseudo-position__right');

        if (getCollision(figureLeftDom, pseudoLeftDom, 5)) {
          dispatch('setTransitionLeft', false);
          dispatch('setAddFigure', 'left');
          if (getters.getSpeed < 20) dispatch('setSpeed', 5);
          setTimeout(() => { dispatch('setTransitionLeft', true) }, 100);
        }
        if (getCollision(figureRightDom, pseudoRightDom, 5)) {
          dispatch('setTransitionRight', false);
          dispatch('setAddFigure', 'right');
          setTimeout(() => { dispatch('setTransitionRight', true) }, 100);
        }
      });
    },
    setPaused (ctx) {
      ctx.commit('SET_PAUSED', true);
      ctx.dispatch('setClearInterval');
    },
    setContinue (ctx) {
      ctx.commit('SET_PAUSED', false);
      ctx.dispatch('setPlaying');
    },
    setResetGameState (ctx) {
      const resetGameState = gameState();
      Object.keys(resetGameState).forEach(key => {
        ctx.state[key] = resetGameState[key]
      })
    },
    setResetPlaying (ctx) {
      ctx.dispatch('setClearInterval');
      ctx.dispatch('setResetGameState');
      ctx.dispatch('setResetFiguresState');
    },
    setDestroyPlaying (ctx) {
      ctx.commit('SET_GAME_OVER', true);
      
      setTimeout(() => {
        ctx.commit('SET_GAME_OVER', false);
        ctx.dispatch('setClearInterval');
        ctx.dispatch('setResetGameState');
        ctx.dispatch('setResetFiguresState');
      }, 3000);
    },
    setBalance (ctx) {
      const leftBalance = ctx.getters.getTeeterWeightLeft;
      const rightBalance = ctx.getters.getTeeterWeightRight;
      ctx.commit('SET_BALANCE', leftBalance + rightBalance);
    },
    setSpeed (ctx, value) {
      ctx.commit('SET_SPEED', value);
    },
    setPlayButton (ctx) {
      if (!ctx.getters.getPlaying) ctx.dispatch('setPlaying');
      else ctx.dispatch('setResetPlaying');
    },
    setPauseButton (ctx) {
      if (ctx.getters.getPaused) ctx.dispatch('setContinue');
      else ctx.dispatch('setPaused');
    }
  }
}