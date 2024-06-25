<template>
    <div>
        component입니다{{name}}
    </div>
</template>

<script setup>

const props = defineProps({
    name : {type : String }
})

</script>

<style lang="scss" scoped>

</style>