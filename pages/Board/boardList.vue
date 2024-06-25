<template>
    <div>
        -게시판 목록-
        갯수 : {{count}}
        <BoardListComp @update="update"></BoardListComp>
    </div>
</template>

<script setup>
let count = ref(0)
const update = (params) => {
    
    count.value = params.cnt
    console.log(count.value);
}

</script>

<style lang="scss" scoped>

</style>