<template>
    <div>
        <input type="button" @click="goHome" value="로그인">
    </div>
</template>

<script setup>
const router = useRouter();
const goHome = () =>{
    const params = {id : "1",
                    name : "11"}
    router.push({path : "/HOM/home0001", query : params})
}

</script>

<style lang="scss" scoped>

</style>