<template>
  <div class="container mt-5 mb-5 bg-white">
    <div class="row py-3">
      <div class="col-md-12">
        <div class="tabbable-panel">
          <div class="tabbable-line">
            <ul class="nav nav-tabs ">
              <li :class="{ active: tabActive === 'pf' }" class="tab-btn" @click="tabActive = 'pf'">
                Pessoa Física
              </li>
              <li :class="{ active: tabActive === 'pj' }" class="tab-btn" @click="tabActive = 'pj'">
                Pessoa Juridica
              </li>
            </ul>
            <div class="tab-content">
              <div :class="{ active: tabActive === 'pf' }" class="tab-pane" id="tab_PF">
                <TabelaPessoa :headers="headerTablePF" :items="listagemPF" itemsKey="id" />
              </div>
              <div :class="{ active: tabActive === 'pj' }" class="tab-pane" id="tab_PJ">
                <TabelaPessoa :headers="headerTablePJ" :items="listagemPJ" itemsKey="id" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TabelaPessoa from "../../components/TabelaPessoas.vue";

export default {
  name: "Listagem",
  components: {
    TabelaPessoa
  },
  data() {
    return {
      tabActive: "pf",
      headerTablePF: [
        {
          name: "Nome",
          dataName: "nome"
        },
        {
          name: "CPF",
          dataName: "cpf"
        },
        {
          name: "Data Nascimento",
          dataName: "nascimento"
        },
        {
          name: "E-mail",
          dataName: "email"
        }
      ],
      headerTablePJ: [
        {
          name: "Nome",
          dataName: "nome"
        },
        {
          name: "CNPJ",
          dataName: "cnpj"
        },
        {
          name: "Razão Social",
          dataName: "razao"
        },
        {
          name: "E-mail",
          dataName: "email"
        }
      ]
    };
  },
  methods: {
    generateList() {
      this.$store.dispatch("generateList");
    }
  },
  created() {
    this.generateList();
  },
  computed: {
    listagemPF() {
      return this.$store.state.cadastros
        .filter(element => element.tipo === "fisica")
        .map(item => {
          return {
            // eslint-disable-next-line no-underscore-dangle
            id: item._id,
            nome: item.nome,
            cpf: item.cpf,
            nascimento: item.nascimento,
            email: item.email
          };
        });
    },
    listagemPJ() {
      return this.$store.state.cadastros
        .filter(element => element.tipo === "juridica")
        .map(item => {
          return {
            // eslint-disable-next-line no-underscore-dangle
            id: item._id,
            nome: item.nome,
            cnpj: item.cnpj,
            razao: item.razao,
            email: item.email
          };
        });
    }
  }
};
</script>
<style src="./style.scss" lang="scss" />
