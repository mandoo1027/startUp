<template>
  <v-row v-resize="onResize" align="center" justify="center">
    <v-col class="text-center">
      <div class="text-subtitle-2">Window Size</div>
      {{ windowSize }}
    </v-col>
  </v-row>
</template>
<script setup>
const windowSize = ref({
  x: 0,
  y: 0,
})
onMounted(() => {
  onResize()
})
const onResize = () => {
  windowSize.value = { x: window.innerWidth, y: window.innerHeight }
}
</script>