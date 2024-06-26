<template>
    <div style="margin: 10px 10px;">
        <h2>게시판</h2>
        <p>사용자 수: {{ userList.length }}</p>
        <hr style="margin: 10px 0px 10px 0px;">

        <BoardList @update="update1" ref="boardChid" :userList="userList"></BoardList>

        <hr style="margin: 10px 0px 10px 0px;">
        <input type="button" value="expos" @click="exposTest">
    </div>
</template>

<script setup>
const userList = [
    {index : 1, userId : "user1"},
    {index : 2, userId : "user2"},
    {index : 3, userId : "user3"},
    {index : 4, userId : "user4"},
    {index : 5, userId : "user5"},
    {index : 6, userId : "user6"},
    {index : 7, userId : "user7"},
    {index : 8, userId : "user8"},
    {index : 9, userId : "user9"},
    {index : 10, userId : "user10"},
    {index : 11, userId : "user11"},
]

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