<template>
    <div class="container">
        <div class="input-section">
            <div class="input-group">
                <label for="userId">아이디:</label>
                <input type="text" id="userId" v-model="userId" style="border: 1px solid; margin-right: 10px;">
            </div>
            <div class="input-group">
                <label for="userPw">비밀번호:</label>
                <input type="text" id="userPw" v-model="userPw" style="border: 1px solid; margin-right: 10px;">
            </div>
        </div>
        <input type="button" :disabled="!userId" @click="goBoard" value="로그인" class="btn">
  </div>
</template>

<script setup>

const router = useRouter();
const userId = ref('');
const userPw = ref('');

const goBoard = () =>{
    if(confirm(`아이디 : ${userId.value} 사용자가 맞습니까?`)){
        const params = {userId : userId.value, userPw : userPw.value}
        router.push({path : "/Board/boardList", query : params})
    }
    
}

const openPop = () =>{
  $fx
    .throwDialog('BoardList', { data: {}, close: false, closeLabel: '확인' })
    .then((result) => {
      if (result) {
        console.log('throwDialog result', result)
      }
    })
}

const alertTet = () =>{
  $fx.throwAlert('알림', '알림창입니다.')
}
const confirm = () =>{
        $fx
        .throwConfirm('승인을 진행하시겠습니까?', '알림', {
          confirmLabel: '확인',
          closeLabel: '취소',
        })
        .then((result) => {
          console.log(result)
        }
        )
      }

      //git test

</script>

<style scoped>
.container {
    display: flex; /* 수평 정렬을 위한 Flexbox 설정 */
    align-items: center; /* 자식 요소들을 컨테이너의 상단에 정렬 */
  }

  .input-section {
    display: flex; /* 입력 섹션을 수평으로 정렬 */
    flex-direction: column; /* 입력 항목을 수직으로 배치 */
    margin-right: 20px; /* 로그인 버튼과의 간격 */
  }

  .input-group {
    display: flex; /* 라벨과 입력란을 수평으로 배치 */
    margin-bottom: 10px; /* 입력 그룹 간의 수직 간격 */
  }

  .input-group label {
    min-width: 70px; /* 라벨의 최소 너비 */
  }

  .btn {
    padding: 10px 20px; /* 버튼의 패딩 */
    font-size: 16px; /* 글꼴 크기 */
    background-color: blanchedalmond;
    border: 2px solid  black;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    outline: none;
  }


</style>