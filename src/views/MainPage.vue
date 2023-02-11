<script setup lang="ts">
import HeaderComponent from '@/components/header-component.vue'
import FooterComponent from '@/components/footer-component.vue'
import SideBar from '@/components/side-bar.vue'
import MapComponent from '@/components/map-component.vue'
</script>

<template>
  <HeaderComponent />
  <div class="container">
    <SideBar />
    <main>
      <MapComponent />
    </main>
  </div>
  <FooterComponent />
</template>
