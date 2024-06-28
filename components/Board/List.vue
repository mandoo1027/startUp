<template>
    <div>
        <table style="border: 1px solid black;">
            <thead>
                <tr>
                    <th><input type="checkbox" v-model="selectAllUserList" @click="allSelect"></th>
                    <th>번호</th>
                    <th>이름</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in LUserList" :key="index">
                    <th><input type="checkbox" :value="item" v-model="selectUserList"></th>
                    <th @click="goDetail(item)">{{ item.index }}</th>
                    <th @click="goDetail(item)">{{ item.userId }}</th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>

const LUserList = ref([])
const userCnt = ref(0);
const emit = defineEmits(['update', 'updateCnt'])
const selectUserList = ref([])
const selectAllUserList = ref(false)

const props = defineProps({
    userList : Array
})
onMounted(() => {
    LUserList.value = props.userList
    userCnt.value = LUserList.value.length
})
watch(() => LUserList.value.length, (newValue) => {
    userCnt.value = newValue
    emit('updateCnt',newValue)
})
//전체선택 toggle
const allSelect = () => {
    if(!selectAllUserList.value){//전체선택
        selectUserList.value = LUserList.value.map(user => user)
    }else{
        selectUserList.value = []
    }
}
//삭제
const deleteUser = () => {
    LUserList.value = LUserList.value.filter(user => !(new Set(selectUserList.value.map(user => user.userId)).has(user.userId)));
}
//상세페이지
const router = useRouter();
const goDetail = (item) =>{
    const params = {index : item.index, userId : item.userId}
    router.push({path:'/Board/boardDetail', query : params})
}


const a1 = 'aaaa1';
const a2 = () => {
    console.log("aaa2");
}

const CheckCount = () =>{
    const params = {cnt : "1"}
    emit('update', params)
}

defineExpose({
    a1,
    a2,
    deleteUser,
    userCnt
})
</script>

<style lang="scss" scoped>

</style>