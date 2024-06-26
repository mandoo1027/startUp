<template>
  <v-select 
    :items="bindItems"
    item-title="title"
    item-value="value"
    label="Select an option"
    @update:model-value="updateValue"
  ></v-select>
</template>
<script setup>
const emit = defineEmits()
const props = defineProps({
  groupCode: {
    type: String,
    default: '',
  }, 
  items: {
    type: Object,
    default: null,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  isAll: {
    type: Boolean,
    default: false,
  },
})
const searchItems = ref([])
const bindItems = computed(() => {
  let returnData = []
  if (props.items) {
    returnData = props.items
  } else {
    returnData = searchItems.value
  }
  const copiedArray = [...returnData]
  if (props.isDefault) {
    copiedArray.unshift({ title: '선택하세요', value: '' })
  }else if(props.isAll){ 
    copiedArray.unshift({ title: '전체', value: '' })
  }

  return copiedArray
})

const updateValue = (value) => {
  emit('update:modelValue', value)
}

onBeforeMount(() => {
  //api호출
  //props.groupCode
  if(props.groupCode){
    searchItems.value = [

      { title: '당근', value: '004' },
      { title: '사과', value: '005' },
    ]

  }
  
})
</script>




