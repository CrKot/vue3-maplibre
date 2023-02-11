<template>
  <aside class="sidebar">
    <MapBtn
      id="addPoints"
      title="Ставить точки"
      :selected="currentIntectionsState === 'addPoints'"
      @onClick="changeInteractionType"
    />
    <MapBtn
      id="addPolygon"
      title="Рисовать контур"
      :selected="currentIntectionsState === 'addPolygon'"
      @onClick="changeInteractionType"
    />
    <MapBtn
      id="removeLayer"
      title="Удалить слой"
      :selected="currentIntectionsState === 'removeLayer'"
      @onClick="changeInteractionType"
    />
    <MapBtn
      id="clearMap"
      title="Очистить карту"
      @onClick="clearMap"
    />
    <div class="sidebar__countBlock">
      Точек на контуре:
      <strong :style="{ color: countPointInPolygon ? 'green' : 'red' }">
        {{ countPointInPolygon }}
      </strong>
    </div>
  </aside>
</template>

<script lang="ts">
  import {
    defineComponent,
    computed
  } from 'vue'
  import { useStore } from 'vuex'
  import MapBtn from '@/components/ui/map-btn.vue'
  import { mapInteractionStateType } from '@/enums'

  export default defineComponent({
    name: 'SideBar',
    components: { MapBtn },
    emits: ['clearMap'],

    setup () {
      const store = useStore()
      const currentIntectionsState = computed(() => store.getters.getInteraction)
      const countPointInPolygon = computed(() => store.getters.getCounterPointInPolygon)

      /**
       * Меняет тип взаимодействия с картой
       */
      const changeInteractionType = (id: string) => {
        if (currentIntectionsState.value === id) {
          store.dispatch('changeInteractionState', mapInteractionStateType.NO_INTERACTION)
          return
        }
        store.dispatch('changeInteractionState', id)
      }

      /**
       * Удаляет слои с карты
       */
      const clearMap = () => {
        store.dispatch('clearMap')
      }

      return {
        countPointInPolygon,
        currentIntectionsState,
        clearMap,
        changeInteractionType
      }
      
    }
  })
</script>
