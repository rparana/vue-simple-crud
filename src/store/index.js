import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pessoa: {
      _id: "",
      tipo: "fisica",
      nome: "",
      cpf: "",
      sexo: "",
      nascimento: "",
      razao: "",
      cnpj: "",
      email: "",
      telefone: "",
      celular: "",
      foto: "",
      enderecos: []
    },
    cadastros: [],
    baseUrl: "https://jsonbox.io/box_e0a57fd56b116229c610"
  },
  mutations: {
    resetPerson(state) {
      const pessoa = {
        _id: "",
        tipo: "fisica",
        nome: "",
        cpf: "",
        sexo: "",
        nascimento: "",
        razao: "",
        cnpj: "",
        email: "",
        telefone: "",
        celular: "",
        foto: "",
        enderecos: []
      };
      state.pessoa = pessoa;
    },
    setPerson(state, payload) {
      const { pessoa } = payload;
      state.pessoa = pessoa;
    },
    deletePerson(state, payload) {
      const { index } = payload;
      state.cadastros.splice(index, 1);
    },
    setCadastros(state, payload) {
      const { cadastros } = payload;
      state.cadastros = cadastros;
    }
  },
  actions: {
    async getPerson(ctx, payload) {
      const id = payload;
      axios({
        url: `${ctx.state.baseUrl}/${id}`,
        method: "get"
      }).then(response => {
        if (response.status === 200) {
          // console.log(response.data);
          ctx.commit("setPerson", { pessoa: response.data });
        }
      });
    },
    async addPerson(ctx, payload) {
      axios
        .post(ctx.state.baseUrl, {
          payload
        })
        .then(response => {
          if (response.status === 200) {
            // eslint-disable-next-line no-underscore-dangle
            this.id = response.data._id;
            this.tipoModal = "alert-success";
            this.mensagemModal = "Dados gravados com sucesso!";
          } else {
            this.tipoModal = "alert-danger";
            this.mensagemModal = "erro ao gravar dados!";
          }
          this.showModal = true;
        })
        .catch(error => {
          this.tipoModal = "alert-danger";
          this.mensagemModal = error;
          this.showModal = true;
          console.log(error);
        });
    },
    async deletePerson(ctx, payload) {
      const id = payload;
      // eslint-disable-next-line no-underscore-dangle
      const index = this.state.cadastros.findIndex(cadastro => cadastro._id === id);
      axios
        .delete(`${ctx.state.baseUrl}/${id}`)
        .then(() => {
          this.commit("deletePerson", { index });
        })
        .catch(error => {
          this.tipoModal = "alert-danger";
          this.mensagemModal = error;
          this.showModal = true;
          console.log(error);
        });
    },
    async generateList(ctx) {
      axios({
        url: ctx.state.baseUrl,
        method: "get"
      }).then(response => {
        if (response.status !== 200) {
          console.error("Erro ao carregar listagem!");
        } else {
          ctx.commit("setCadastros", { cadastros: response.data });
        }
      });
    }
  },
  modules: {}
});
