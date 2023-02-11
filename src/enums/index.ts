/**
 * Ключ для карт
 */
export const API_KEY = process.env.VUE_APP_API_KEY

/**
 * центр карты по дефолту
 */
export const INITIAL_CENTER = {
  lng: 86.0910458131678,
  lat: 55.35192397201547,
  zoom: 11
}

export enum storeData {
  FEATURE            = 'Feature',
  FEATURE_COLLECTION = 'FeatureCollection',
  POLYGON            = 'Polygon',
  POINT              = 'Point'
}

/**
 * Состояния взаимодействия с картой
 * Повторяют енамы из MapboxDraw.modes
 */
export enum drawMode {
  SIMPLE_SELECT = 'simple_select',
  DRAW_POLYGON  = 'draw_polygon',
  DRAW_POINT    = 'draw_point',
  DIRECT_SELECT = 'direct_select'
}

/**
 * Состояния взаимодействия с картой
 */
export enum mapInteractionStateType {
  NO_INTERACTION = 'noInteraction',
  ADD_POINTS     = 'addPoints',
  ADD_POLYGON    = 'addPolygon',
  REMOVE_LAYER   = 'removeLayer',
  CLEAR_MAP      = 'clearMap'
}

/**
 * Мутации стора
 */
export enum mutationList {
  UPDATE_POINTS   = 'UPDATE_POINTS',
  UPDATE_POLYGONS = 'UPDATE_POLYGONS',
  REMOVE_POINT    = 'REMOVE_POINT',
  REMOVE_POLYGON  = 'REMOVE_POLYGON',
  CLEAR_MAP       = 'CLEAR_MAP',
  CHANGE_INTERACTION_STATE     = 'CHANGE_INTERACTION_STATE',
  SET_COUNTER_POINT_IN_POLYGON = 'SET_COUNTER_POINT_IN_POLYGON'
}