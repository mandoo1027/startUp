import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { $utils } from "@/composables/common/utils";
// import AOS from 'aos'
// import 'aos/dist/aos.css'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
  });
  nuxtApp.vueApp.use(vuetify);
  nuxtApp.vueApp.config.globalProperties.$utils = $utils;
  // $utils.setDayjs(nuxtApp.$dayjs)

  const router = useRouter();
  $fx.setRouter(router);

  const config = useRuntimeConfig();
  $fx.setConfig(config);
  // if (typeof window !== 'undefined') {
  //   nuxtApp.AOS = AOS.init({
  //     duration: 1200,
  //   })

  nuxtApp.vueApp.directive("autocomplete-off", {
    mounted(el) {
      el.getElementsByClassName("v-field__input")[0]?.setAttribute(
        "autocomplete",
        "off"
      );
    },
  });

  nuxtApp.vueApp.directive("focus", {
    mounted(el) {
      el.getElementsByClassName("v-field__input")[0]?.focus();
    },
  });
});
