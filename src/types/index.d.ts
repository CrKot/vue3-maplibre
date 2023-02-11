import {
  storeData,
  mapInteractionStateType
} from "@/enums"

interface mapDescriptionTypes {
  title?: string,
  description?: string
}

export interface pointFeaturesType {
  id: number,
  type: `${storeData.FEATURE}`,
  geometry: {
    type: `${storeData.POINT}`,
    coordinates: [number, number]
  },
  properties?: mapDescriptionTypes
}

export interface pointDataType {
  type: `${storeData.FEATURE_COLLECTION}`,
  features: pointFeaturesType[]
}

export interface polygonFeatures {
  id: string,
  type: `${storeData.FEATURE}`,
  geometry: {
    type: `${storeData.POLYGON}`,
    coordinates: number[][][]
  },
  properties?: mapDescriptionTypes
}

export interface polygonDataType {
  type: `${storeData.FEATURE_COLLECTION}`,
  features: polygonFeatures
}

export interface storeType {
  mapInteractionState: mapInteractionStateType,
  countPointInPolygon: number,
  points: pointDataType,
  polygon: polygonData
}
