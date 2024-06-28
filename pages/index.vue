<template>
    <div>
        <h2>welcome to home!!</h2>
        <input type="button" value="login" @click="goLoginP">
    </div>
</template>

<script setup>
//router
const router = useRouter();

//move to login page
const goLoginP = () => {
    console.log(111222)
    router.push("LOG/login")
}
</script>

<style lang="scss" scoped>

</style>