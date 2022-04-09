import { createStore } from 'vuex'
import Game from './modules/game'
import Figures from './modules/figures'

export default createStore({
  modules: {
    Game,
    Figures
  }
});