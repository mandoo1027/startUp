import { defineStore } from 'pinia'

export const userInfoStore = defineStore('userInfo', () => {
  const userInfo = ref({
    sessionKey: '',
    userId: '',
    userName: '',
    redirectUrl: '',
    isShowLoginExtension: false, //로그인 연장 팝업 제어
  })

  const getSessionKey = () => {
    if (!userInfo.value.sessionKey) {
      const sessionKey = $fx.getSessionStorageItem('sessionKey')
      if (sessionKey) {
        setSessionKey(String(sessionKey))
      }
    }
    return userInfo.value.sessionKey
  }

  const setSessionKey = (sessionKey: string) => {
    userInfo.value.sessionKey = sessionKey
  }
  const setLoginExtension = (value: boolean) => {
    userInfo.value.isShowLoginExtension = value
  }
  const clearSessionKey = () => {
    userInfo.value.sessionKey = ''
  }
  const setReDirectUrl = (url: string) => {
    userInfo.value.redirectUrl = url

    $fx.setSessionStorageItem('redirectUrl', url)
  }

  const getRedirectUrl = () => {
    //LoginForm에서 호출: 해당 함수를 호출했다는건 로그인이 되었다는 의미이기때문에 세션 스토리지에서 삭제
    $fx.removeSessionStorageItem('redirectUrl')
    let redirectUrl = userInfo.value.redirectUrl
    return redirectUrl ? redirectUrl : '/'
  }

  const isLogin = () => {
    return !!userInfo.value.sessionKey
  }
  const logout = () => {
    clearSessionKey()
    $fx.removeSessionStorageItem('sessionKey')
    $fx.removeSessionStorageItem('loginTime')
  }

  return {
    getSessionKey,
    setSessionKey,
    clearSessionKey,
    setReDirectUrl,
    getRedirectUrl,
    isLogin,
    logout,
    setLoginExtension,
  }
})
