<template>
  <div>
    <span @click="popup">팝업테스트</span>
    <span @click="alert">알럿테스트</span>
  </div>
</template>

<script setup>
const popup = () => {
  $fx
    .throwDialog('common/ComSwiper', { data: {}, close: true, closeLabel: '확인' })
    .then((result) => {
      if (result) {
        console.log('throwDialog result', result)
      }
    })
}
const alert = () => {
  $fx.throwAlert('알럿테스트 입니다.').then(() => {
    console.log(11)
  })
}
</script>
