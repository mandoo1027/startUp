<template>
    <div>
        <BoardDetail :userId="userId1"></BoardDetail>
    </div>
</template>

<script setup>
const route = useRoute();
const index = ref(0);
const userId1 = ref('');

onMounted(() => {
    userId1.value = route.query.userId; // URL 쿼리에서 userId 값을 읽어옴
    index.value = route.query.index;
    console.log("Received userId:", userId1.value); // 콘솔에 출력하여 값 확인
});
</script>

