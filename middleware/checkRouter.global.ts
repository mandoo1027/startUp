// import { menuStore } from '@/store/menuStore'
// import { userInfoStore } from '@/store/userInfoStore'
// const noLayout = ['/sample/EmptyLayout'] //비어있는 레이아웃 페이지
// const loginNoEnterPage = ['/sample/LoginNoEnterPage'] //비로그인시 접근금지
// const noShowNavigator = ['/'] //메뉴명 및 네비게이터 노출
export default defineNuxtRouteMiddleware(async (to, from) => {
  // if (noShowNavigator.includes(to.path)) {
  //   menuStore().setNavigator(false)
  // } else {
  //   menuStore().setNavigator(true)
  // }
  // //레이아웃 제거
  // if (noLayout.includes(to.path)) {
  //   menuStore().setAllDisabled()
  // } else {
  //   menuStore().setAllActivate()
  // }
  // const sessionKey = userInfoStore().getSessionKey()
  // if (!sessionKey) {
  //   if (loginNoEnterPage.includes(to.path)) {
  //     userInfoStore().setReDirectUrl(to.path)
  //     alert('비로그인 상태입니다. 로그인 후 이동해주세요.')
  //     return navigateTo('/LOG/LOG001M00')
  //   }
  // }
  //menuStore().setAllDisabled() //레이아웃 전체 비활성화
  // const store = userInfoStore()
  // if (process.client) {
  //   if (!store.getSessionKey()) {
  //     //로그인 페이지 띄우기
  //     return false
  //   }
  // }
  // if (to.params.id === '1') {
  //   return abortNavigation()
  // }
  // if (to.path !== '/') {
  //   return navigateTo('/')
  // }
});
