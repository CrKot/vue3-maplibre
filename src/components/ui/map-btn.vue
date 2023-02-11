<template>
  <button
    :id="id"
    :class="['map-btn', selected ? '_selected' : '' ]"
    type="button"
    @click="onClickHandler()"
  >
    {{ title }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'MapBtn',
    props: {
      id: { type: String, required: true },
      title: { type: String, required: true },
      selected: { type: Boolean, default: false }
    },
    emits: ['onClick'],

    setup(props, context) {
    /**
     * Эмитит событие клика возвращая айди
     */
    const onClickHandler = () => {
      context.emit('onClick', props.id)
    }

    return { onClickHandler }
  }
  })
</script>
