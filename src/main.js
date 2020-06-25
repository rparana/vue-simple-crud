import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserAlt,
  faMapMarkerAlt,
  faPlus,
  faTrashAlt,
  faSearch,
  faSave,
  faListAlt,
  faEdit,
  faChevronLeft,
  faChevronRight,
  faSortAmountUpAlt,
  faSortAmountDownAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueTheMask from "vue-the-mask";
import Vuelidate from "vuelidate";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

library.add(
  faUserAlt,
  faMapMarkerAlt,
  faPlus,
  faTrashAlt,
  faSearch,
  faSave,
  faListAlt,
  faEdit,
  faChevronLeft,
  faChevronRight,
  faSortAmountUpAlt,
  faSortAmountDownAlt
);
Vue.use(VueTheMask);
Vue.use(Vuelidate);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  Vuelidate,
  VueTheMask,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
