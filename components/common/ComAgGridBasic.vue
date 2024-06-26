<template>
  <ag-grid-vue
    class="ag-theme-alpine"
    style="height: 950px"
    :columnDefs="props.columnDefs"
    :rowData="props.rowData"
    :defaultColDef="props.defaultColDef"
    suppressColumnVirtualisation="true"
    animateRows="true"
    :rowDragManaged= "true"
    :rowDragEntireRow="true"
    copyHeadersToClipboard="true"
    @cell-clicked="cellWasClicked"
    @cell-focused="cellFocused"
    @grid-ready="onGridReady"
    @cell-value-changed="cellValueChanged"
    :pagination="props.pagination"
    :paginationPageSize="props.paginationPageSize"
  >
  </ag-grid-vue>
</template>

<script setup>
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { AgGridVue } from 'ag-grid-vue3'
const emits = defineEmits(['getGridOption'])

const props = defineProps({
  columnDefs: {
    type: Array,
    default: [],
  },
  rowData: { type: Array, default: [] },
  defaultColDef: { type: Object, default: {} },
  pagination: { type: Boolean, default: false },
  paginationPageSize: { type: Number, default: 0 },
})

const gridOption = ref({})

const cellWasClicked = (e) => {
  console.log('cellWasClicked:::', e)
}
const cellFocused = (e) => {
  console.log('cellFocused:::', e)
}
const onGridReady = (e) => {
  gridOption.value = e
  console.log('gridOption.value: :', gridOption.value)
}
const cellValueChanged = (e) => {
  console.log('cellValueChanged:::', e)
}
const paginationGoToNextPage = (e) => {
  console.log('paginationGoToNextPage:::', e)
}
defineExpose({
  gridOption,
})
</script>
