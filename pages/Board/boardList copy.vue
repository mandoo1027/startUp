<template>
    <div>
        <h2><li>게시판</li></h2>
        <BoardListComp @update="update1" ref="boardChid"></BoardListComp>
        <input type="button" value="expos" @click="exposTest">

    </div>
</template>

<script setup>
const boardChid = ref(null);

const exposTest = () => {
    console.log(boardChid.value.a1);
    boardChid.value.a2()
}

let count = ref(0)
const update1 = (params) => {
    
    count.value = params.cnt
    console.log(count.value);
}

</script>

<style lang="scss" scoped>

</style>