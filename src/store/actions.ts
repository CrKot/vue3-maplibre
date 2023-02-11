import {
  mapInteractionStateType,
  mutationList
} from '@/enums'
import { pointFeaturesType, polygonDataType } from '@/types'
import { Commit } from 'vuex'

export const actions = {
  changeInteractionState (
    { commit }: { commit: Commit },
    interactionType: mapInteractionStateType
  ) {
    commit(mutationList.CHANGE_INTERACTION_STATE, interactionType)
  },

  updateCount (
    { commit }: { commit: Commit },
    currentCount: number
  ) {
    commit(mutationList.SET_COUNTER_POINT_IN_POLYGON, currentCount)
  },

  updatePoint (
    { commit }: { commit: Commit },
    pointList: pointFeaturesType[]
  ) {
    commit(mutationList.UPDATE_POINTS, pointList)
  },

  updatePolygon (
    { commit }: { commit: Commit },
    polygonList: polygonDataType
  ) {
    commit(mutationList.UPDATE_POLYGONS, polygonList)
  },

  removePoint (
    { commit }: { commit: Commit },
    id: number
  ) {
    commit(mutationList.REMOVE_POINT, id)
  },

  removePolygon ({ commit }: { commit: Commit }) {
    commit(mutationList.REMOVE_POLYGON)
  },

  clearMap ({ commit }: { commit: Commit }) {
    commit(mutationList.CLEAR_MAP)
    commit(mutationList.CHANGE_INTERACTION_STATE, mapInteractionStateType.CLEAR_MAP)
  }
}
