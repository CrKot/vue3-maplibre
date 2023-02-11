import { createStore } from 'vuex'
import { mutations } from "./mutations"
import { actions } from "./actions"
import { state } from "./state"

export default createStore({
  state,
  getters: {
    getPointList(state) {
      return state.points
    },
    getPolygon(state) {
      return state.polygon
    },
    getInteraction(state) {
      return state.mapInteractionState
    },
    getCounterPointInPolygon(state) {
      return state.countPointInPolygon
    }
  },
  mutations,
  actions
})
