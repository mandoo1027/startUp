<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
</script>
<template>
  <vue-date-picker
    class="dp"
    placeholder="선택하세요"
    format="yyyy-MM-dd"
    locale="ko"
    :noMinutesOverlay="true"
    :enable-time-picker="false"
    auto-apply
    :close-on-auto-apply="true"
  />
</template>
<style>
</style>