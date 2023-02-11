import {
  mapInteractionStateType,
  storeData
} from '@/enums'

// Точки
const storageFeatures = localStorage.getItem(storeData.POINT)
const features = storageFeatures
  ? JSON.parse(storageFeatures)
  : []

// Полигон
const storagePolygon = localStorage.getItem(storeData.POLYGON)
const polygonFeature = storagePolygon
  ? JSON.parse(storagePolygon)
  : []

export const state = {
  mapInteractionState: mapInteractionStateType.NO_INTERACTION,
  countPointInPolygon: 0,
  points: {
    // TODO: убрать as
    type: storeData.FEATURE_COLLECTION as storeData.FEATURE_COLLECTION,
    features
  },
  polygon: {
    type: storeData.FEATURE_COLLECTION,
    features: polygonFeature
  }
}
