import {
  mapInteractionStateType,
  mutationList,
  storeData
} from '@/enums'
import {
  pointFeaturesType,
  polygonDataType,
  polygonFeatures,
  storeType
} from '@/types'

/**
 * Сохраняет в сторадж координаты дотов
 */
const setPointsStorage = (featureList: pointFeaturesType[]) => {
  localStorage.setItem(storeData.POINT, JSON.stringify(featureList))
}

const setPolygonStorage = (polygon: polygonFeatures[]) => {
  localStorage.setItem(storeData.POLYGON, JSON.stringify(polygon))
}

export const mutations = {
  [mutationList.CHANGE_INTERACTION_STATE] (
    state: storeType,
    interactionType: mapInteractionStateType
  ) {
    state.mapInteractionState = interactionType
  },

  [mutationList.SET_COUNTER_POINT_IN_POLYGON] (
    state: storeType,
    currentCount: number
  ) {
    state.countPointInPolygon = currentCount
  },

  [mutationList.UPDATE_POINTS] (
    state: storeType,
    pointList: pointFeaturesType[]
  ) {
    state.points.features = pointList
    setPointsStorage(state.points.features)
  },

  [mutationList.UPDATE_POLYGONS] (
    state: storeType,
    polygonList: polygonDataType
  ) {
    state.polygon.features = polygonList
    setPolygonStorage(state.polygon.features)
  },

  [mutationList.REMOVE_POINT] (
    state: storeType,
    id: number
  ) {
    state.points.features = state.points.features
      .filter(item => {
        console.log(item)
        console.log(id)
        return item.id !== id
      })
    setPointsStorage(state.points.features)
  },

  [mutationList.REMOVE_POLYGON] (state: storeType) {
    state.polygon.features = []
    setPolygonStorage([])
  },

  [mutationList.CLEAR_MAP] (state: storeType) {
    state.points.features = []
    state.polygon.features = []
    state.countPointInPolygon = 0
    setPointsStorage([])
    setPolygonStorage([])
  }
}
