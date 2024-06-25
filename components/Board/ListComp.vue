<template>
    <div>
        제목1
        <input type="button" value="클릭" style="border: 1px solid #515151;" @click="CheckCount">
    </div>
</template>

<script setup>
const emit = defineEmits(['update'])
const CheckCount = () =>{
    const params = {cnt : "1"}
    emit('update', params)
}
</script>

<style lang="scss" scoped>

</style>