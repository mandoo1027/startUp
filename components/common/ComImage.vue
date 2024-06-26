<template>
  <v-row>
    <v-col>
      <v-img
        :src="props.src"
        :lazy-src="props.src"
        aspect-ratio="1"
        contain
        class="bg-grey-lighten-2"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>
</template>
<script setup>
const props = defineProps({
  src: {
    type: String,
    default: '',
  },
})
</script>