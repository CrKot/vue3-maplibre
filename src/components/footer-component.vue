<template>
  <div class="footer">
    <span>By Artem Salikhov</span>
    <span>Telegram @Artem_Krv</span>
    <span>{{ new Date().getFullYear() }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FooterComponent'
})
</script>
