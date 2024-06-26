<template>
  <!-- <v-btn class="bg-primary" @click="openWindow()">DOC 뷰어 띄우기</v-btn> -->
  <iframe v-if="converterSrc" :src="converterSrc" frameborder="0"></iframe>
  <div v-else>정상적인 URL이 아닙니다.</div>
</template>
<script setup>
const props = defineProps({
  src: {
    type: String,
    default: '',
  },
})
const converterSrc = computed(() => {
  const baseSrc = 'https://view.officeapps.live.com/op/view.aspx?src='
  let returnUrl = ''
  if (props.src) {
    returnUrl = `${baseSrc}${props.src}`
  }
  console.log(returnUrl)
  return returnUrl
})
</script>  