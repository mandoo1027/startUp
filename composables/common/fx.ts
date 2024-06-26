/** global function : gf  */
import { Router } from "vue-router";

import { loadingStore } from "@/store/loadingStore";
import { userInfoStore } from "@/store/userInfoStore";
import { useDialogStore } from "~/store/dialogStore";
import _ from "lodash";
import { menuStore } from "~/store/menuStore";

const storeRouter = {
  router: {},
  params: {}, //Post방식일때
};

const config = {
  apiBase: "",
  baseUrl: "",
  server: "",
};

export const $fx = {
  isTablet: () => {
    const ua = navigator.userAgent;
    const isTablet =
      /ipad|android.*?;.*?mobile|windows.*?tablet|tablet.*?firefox/i.test(ua) &&
      "ontouchend" in document;
    return isTablet;
  },
  setCookieData: (saveData: String, day: number = 1) => {
    document.cookie = `${saveData}; expires=${new Date(Date.now() + day * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
  },
  getCookieData: (cookieName: String) => {
    const name = `${cookieName}=`;
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  },
  setConfig: (configData: Object) => {
    (config.apiBase = configData.public?.apiBase),
      (config.baseUrl = configData.public?.baseUrl),
      (config.server = configData.public?.server);
  },
  setRouter: (router: Router) => {
    storeRouter.router = router;
  },
  startLoadingbar: () => {
    loadingStore().startLoadingbar();
  },
  finishLoadingbar: () => {
    loadingStore().finishLoadingbar();
  },
  axios: () => {
    return $useAxios().instance;
  },
  isLogin: () => {
    return userInfoStore().isLogin();
  },
  logout: (url: String = "/") => {
    //로그아웃
    userInfoStore().logout();
    useDialogStore().clearDialogs();
    useDialogStore().clearIntervalNumber();
    $fx.move(url);
  },
  move: (url: String, params?: Object = {}) => {
    console.log(url);
    storeRouter.router.push(url);
    // let currentPage
    // if(url === '/'){
    //   currentPage = $fx.homePathPage()
    // }else{
    //   currentPage = menuStore().findPage(url)
    // }

    // let movePath
    // if(currentPage?.menuCode){
    //   movePath = currentPage.menuCode
    // }else{
    //   movePath = url
    // }

    // let urlData = {
    //   path : '/idx',
    //   query : {
    //     z : '',
    //     rdn : ''
    //   }
    // }

    // storeRouter.params = params

    // let copyParams = {
    //   z : '',
    //   rdn : '',
    // }
    // copyParams.z = movePath
    // copyParams.rdn = $utils.getRandomNumber()
    // urlData.query = copyParams

    // //페이지 이동
    // storeRouter.router.push(urlData)
  },
  homePathPage: () => {
    let url;
    if ($fx.isLogin()) {
      url = "A";
    } else {
      url = "B";
    }
    return menuStore().findPage(url);
  },
  getParams: () => {
    const route = useRoute();
    let returnValue = {};
    if (Object.keys(storeRouter.params).length > 0) {
      returnValue = storeRouter.params;
    }
    if (Object.keys(route.query).length > 0) {
      returnValue = { ...returnValue, ...route.query };
    }
    if (!returnValue?.z) {
      const page = $fx.homePathPage();
      returnValue.z = page.menuCode;
    }
    return returnValue;
  },
  getRedirectUrl: () => {
    //로그인 후 이동될 URL
    return userInfoStore().getRedirectUrl();
  },
  setSessionStorageItem: (name: string, data: any) => {
    //세션 스토리지 저장
    sessionStorage.setItem(name, data);
  },
  getSessionStorageItem: (name: string) => {
    //세션 스토리지 가져오기
    return sessionStorage.getItem(name);
  },
  removeSessionStorageItem: (name: string) => {
    //세션 스토리지 삭제
    sessionStorage.removeItem(name);
  },
  saveLoginTime: () => {
    const currentTime = new Date().getTime();
    $fx.setSessionStorageItem("loginTime", currentTime.toString());
  },
  checkLoginTime: () => {
    if (!$fx.isLogin()) return;
    const loginTime = $fx.getLoginTime();
    if (loginTime) {
      const currentTime = new Date().getTime();
      const elapsedMinutes = (currentTime - loginTime) / (1000 * 60);
      if (elapsedMinutes >= 10) {
        userInfoStore().setLoginExtension(false);
        $fx.logout();
      } else if (elapsedMinutes >= 9) {
        //경고창 띄우기
        userInfoStore().setLoginExtension(true);
        if (
          confirm(
            "60초 후 자동 로그아웃 입니다.\r\n안전한 사이트 이용을 위해 10분 경과 후 자동으로 접속이 종료됩니다.\r\n로그인 시간을 연장하시겠습니까?"
          )
        ) {
          //health 체크 및 연장
        } else {
          $fx.logout();
        }
      }
    }
  },
  getLoginTime: () => {
    const loginTime = sessionStorage.getItem("loginTime");
    return loginTime ? parseInt(loginTime) : null;
  },
  makeDialog: (option: DialogOption): Promise<any> => {
    const deferrer = createDeferred();
    option._id = _.uniqueId("shinhan_dialog");
    option._deferrer = deferrer;
    option.returnValue = {};

    useDialogStore().pushDialogList(option);

    return option._deferrer.promise;
  },
  throwDialog: (
    name: string,
    options: Partial<DialogOption> = {}
  ): Promise<any> => {
    const combinedOptions: DialogOption = {
      name: name,
      ...options,
    };
    return $fx.makeDialog(combinedOptions);
  },

  throwAlert: (
    message: string,
    title: string,
    options: Partial<DialogOption> = {}
  ): Promise<any> => {
    if (!options.closeLabel) {
      options.closeLabel = "확인";
    }
    const combinedOptions: DialogOption = {
      name: "alert",
      data: { message: message },
      dialogClasses: "small",
      title,
      ...options,
    };
    return $fx.makeDialog(combinedOptions);
  },
  throwConfirm: (
    message: string,
    title: string,
    options: Partial<DialogOption> = {}
  ): Promise<any> => {
    const combinedOptions: DialogOption = {
      name: "alert",
      data: { message: message },
      title,
      confirm: true,
      dialogClasses: "small",
      isShowTitle: false,
      ...options,
    };
    return $fx.makeDialog(combinedOptions);
  },
};

function createDeferred() {
  let _resolve, _reject;
  const promise = new Promise((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
  });
  return {
    promise,
    resolve: _resolve,
    reject: _reject,
  };
}
