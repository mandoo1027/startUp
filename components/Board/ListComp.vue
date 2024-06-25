<template>
    <div>
        제목1
        <input type="button" value="클릭" style="border: 1px solid #515151;" @click="CheckCount">

    </div>
</template>

<script setup>
const a1 = 'aaaa1';
const a2 = () => {
    console.log("aaa2");
}
const emit = defineEmits(['update'])
const CheckCount = () =>{
    const params = {cnt : "1"}
    emit('update', params)
}

defineExpose({
    a1,
    a2
})
const test3 = ref(0);
const test4 = ref(0);
const test5 = ref(0);
</script>

<style lang="scss" scoped>

</style>