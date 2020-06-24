import Vue from "vue";
import VueRouter from "vue-router";
import Cadastro from "../views/Cadastro/Cadastro.vue";
import Listagem from "../views/Listagem/Listagem.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Listagem",
    component: Listagem
  },
  {
    path: "/cadastro",
    name: "Cadastro",
    component: Cadastro
  },
  {
    path: "/cadastro/:id",
    name: "Editar Cadastro",
    component: Cadastro,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
