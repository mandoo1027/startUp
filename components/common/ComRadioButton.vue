<template>
  <v-radio-group v-model="internalValue" :inline="isInline">
    <v-radio
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></v-radio>
  </v-radio-group>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    default: [],
  },
  value: {
    type: String,
    default: '',
  },
  isInline: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['input'])

const internalValue = ref(props.value)

watch(internalValue, (newValue) => {
  emit('input', newValue)
})
</script>
