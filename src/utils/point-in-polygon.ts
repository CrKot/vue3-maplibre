import booleanContains from '@turf/boolean-contains'
import MapboxDraw from "@mapbox/mapbox-gl-draw"
import { pointFeaturesType, polygonFeatures } from '@/types'
import store from "@/store"
import { storeData } from '@/enums'

/**
 * Считает количество точек внутри полигона
  */
export const updateMarkerCount = (draw: MapboxDraw | null) => {
  if (!draw) return

  const pointList: pointFeaturesType[] = []
  const polygonList: polygonFeatures[] = []
  draw.getAll().features.forEach(item => {
    if (item.geometry.type === storeData.POINT) {
      pointList.push(item as pointFeaturesType)
    }
    if (item.geometry.type === storeData.POLYGON) {
      polygonList.push(item as polygonFeatures)
    }
  })
  store.dispatch('updatePoint', pointList)
  store.dispatch('updatePolygon', polygonList)

  if (!pointList.length || !polygonList.length) {
    store.dispatch('updateCount', 0)
    return
  }

  const curentCount = pointList.reduce((count: number, point: pointFeaturesType) => (
    booleanContains(polygonList[0].geometry || [], point.geometry) ? count += 1 : count
  ), 0)

  store.dispatch('updateCount', curentCount)
}
