<template>
  <div class="map-component__map-wrap">
    <div class="map-component__map" ref="mapContainer" id="map"></div>
  </div>
</template>

<script lang="ts">
  import {
    shallowRef,
    onMounted,
    onUnmounted,
    markRaw,
    computed,
    defineComponent,
    watch
  } from 'vue'
  import { useStore } from "vuex"
  import {
    Map,
    NavigationControl,
    MapboxOptions
  } from 'maplibre-gl'
  import MapboxDraw from "@mapbox/mapbox-gl-draw"
  import {
    API_KEY,
    drawMode,
    INITIAL_CENTER,
    mapInteractionStateType,
    storeData
  } from '@/enums'
  import { updateMarkerCount } from "@/utils/point-in-polygon"

  export default defineComponent({
    name: "MapComponent",
  })
</script>

<script setup lang="ts">
  const getInitialMapOptions = (): MapboxOptions => {
    return {
      container: mapContainer.value || 'map',
      accessToken: API_KEY,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [INITIAL_CENTER.lng, INITIAL_CENTER.lat],
      zoom: INITIAL_CENTER.zoom,
      pitch: 30,
      bearing: 0
    }
  }

  const store = useStore()
  const pointStore = computed(() => store.getters.getPointList)
  const polygon = computed(() => store.getters.getPolygon)
  const interactionState = computed(() => store.getters.getInteraction) 
  const mapContainer = shallowRef<HTMLDivElement>()
  const map = shallowRef<Map | null>(null)
  const draw = shallowRef<MapboxDraw | null>(null)

  watch(
    interactionState,
    (curr, _prev) => {
      if (!draw.value) return

      const currentDrawMode = draw.value.getMode()

      if (curr === mapInteractionStateType.NO_INTERACTION) {
        draw.value.changeMode(drawMode.SIMPLE_SELECT)
        return
      }

      if (
        curr === mapInteractionStateType.ADD_POLYGON
        && (currentDrawMode === drawMode.SIMPLE_SELECT
        || currentDrawMode === drawMode.DRAW_POINT)
        ) {
          draw.value.changeMode(drawMode.DRAW_POLYGON)
          if (polygon.value.features[0]) {
            draw.value.delete(polygon.value.features[0].id)
          }
          store.dispatch('updateCount', 0)
      }
  
      if (
        curr === mapInteractionStateType.ADD_POINTS
        && currentDrawMode === drawMode.SIMPLE_SELECT
        ) {
          draw.value.changeMode(drawMode.DRAW_POINT)
      }
  
      if (curr === mapInteractionStateType.REMOVE_LAYER) {
          draw.value.changeMode(drawMode.SIMPLE_SELECT)
      }
  
      if (curr === mapInteractionStateType.CLEAR_MAP) {
          draw.value.deleteAll()
          store.dispatch(
            'changeInteractionState',
            mapInteractionStateType.NO_INTERACTION
          )
      }
    }
  )

  onMounted(() => {
    map.value = markRaw(new Map(getInitialMapOptions()))
    const nav = new NavigationControl({
      showCompass: true,
      showZoom: true
    })

    map.value.addControl(nav, 'top-right')

    draw.value = new MapboxDraw({ displayControlsDefault: false })

    if (!draw.value) return

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    map.value.addControl(draw.value)
    draw.value.add(pointStore.value)
    if (polygon.value.features[0]) {
      draw.value.add(polygon.value.features[0])
    }

    /**
     * Вызывает метод updateMarkerCount и передает в него объект draw
     */
    const updateCount = () => {
      updateMarkerCount(draw.value)
    }

    map.value.on('draw.create', updateCount)
    map.value.on('draw.delete', updateCount)
    map.value.on('draw.update', updateCount)
    map.value.on('load', updateCount)

    /**
     * Обработчик клика по карте
     * Удаляет слои по клику
     */
    map.value.on('click', (_e) => {
      if (!map.value
        || interactionState.value !== mapInteractionStateType.REMOVE_LAYER
      ) return

      draw.value?.getSelected().features.forEach(feature => {
        draw.value?.delete(String(feature.id))
        feature.geometry.type === storeData.POLYGON
          ? store.dispatch('removePolygon', feature.id)
          : store.dispatch('removePoint', feature.id)
      })

      updateCount()
    })

    /**
     * Обработчик клика по карте
     * Меняет состояние drawState
     */
    map.value.on('click', (_e) => {
      switch(interactionState.value) {
        case mapInteractionStateType.ADD_POINTS:
          draw.value?.changeMode(drawMode.DRAW_POINT)
          return
        case mapInteractionStateType.REMOVE_LAYER:
          draw.value?.changeMode(drawMode.SIMPLE_SELECT)
          return
      }
    })

    /**
     * Обработчик ДАБЛ клика по карте
     */
    map.value.on('dblclick', (_e) => {
      if (!draw.value) return

      switch(interactionState.value) {
        case mapInteractionStateType.ADD_POLYGON:
          store.dispatch(
            'changeInteractionState',
            mapInteractionStateType.NO_INTERACTION
          )
          return
      }
    })
  })

  onUnmounted(() => {
    if (map.value) map.value.remove()
  })
</script>
