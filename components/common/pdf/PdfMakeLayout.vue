<template>
  <v-container>
    <v-row class="mb-4">
      <v-col class="text-right">
        <v-btn color="primary" @click="pdfPrint">출력</v-btn>
        <v-btn color="error">닫기</v-btn>
      </v-col>
    </v-row>
    <div id="pdfMain">
      <slot></slot>
    </div>
  </v-container>
</template>
<script setup>
import { createPdfFromHtml, createPdfFromHtml2 } from '@/utils/common/pdfMake.ts'
const props = defineProps({
  pdfType: {
    type: String,
    default: '',
  },
  pdfFileName: {
    type: String,
    default: '',
  },
})
const pdfPrint = () => {
  console.log(props.pdfFileName)
  const productTable = document.getElementById('pdfMain')
  if (props.pdfType === '01') {
    createPdfFromHtml(productTable, props.pdfFileName)
  } else {
    createPdfFromHtml2(productTable, props.pdfFileName)
  }
}
</script>
<style scoped>
#pdfPrint {
  border: 0px solid #c6a1ed;
  overflow-x: hidden;
  overflow-y: auto;
  flex-direction: column;
  padding: 10px 10px;
}

#pdfPrint .report_body {
  display: block;
  width: 100%;
  height: auto;
  position: relative;
  border: 0px solid #230b36;
  padding: 50px 0px 50px 0px;
  background-repeat: repeat;
}

.popLayout {
  width: 1000px;
  height: 900px;
}
#pdfMain {
  padding: 50px;
}
</style>