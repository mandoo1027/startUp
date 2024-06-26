<template>
    <div>
        <table style="border: 1px solid black;">
            <thead>
                <tr>
                    <th><input type="checkbox"></th>
                    <th>번호</th>
                    <th>이름</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in userList" :key="index">
                    <th><input type="checkbox"></th>
                    <th>{{ item.index }}</th>
                    <th>{{ item.userId }}</th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>

const props = defineProps({
    userList : Array
})


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
</script>

<style lang="scss" scoped>

</style>