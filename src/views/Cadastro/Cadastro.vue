<template>
  <div class="container mt-5 mb-5">
    <form action="#" @submit.prevent="save()">
      <div class="row mt-5">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-header d-flex align-items-center">
              <font-awesome-icon icon="user-alt" style="margin-right: 10px;" /> Cadastro
            </div>
            <div class="card-body">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="tipo">Tipo</label>
                </div>
                <select v-model="tipo" class="custom-select" id="tipo" @change="changeType()">
                  <option value="fisica" selected>Pessoa Física</option>
                  <option value="juridica">Pessoa Jurídica</option>
                </select>
              </div>

              <div class="form-group">
                <label for="nome">Nome <span class="text-danger">*</span></label>
                <input
                  v-model="nome"
                  class="form-control"
                  ref="nome"
                  id="nome"
                  type="text"
                  required
                  :class="{ 'is-invalid': $v.nome.$invalid && $v.nome.$dirty }"
                  @input="$v.nome.$touch()"
                />
              </div>

              <CadastroPJ :cnpj.sync="cnpj" :razao.sync="razao" v-if="tipo == 'juridica'" />
              <CadastroPF
                :cpf.sync="cpf"
                :sexo.sync="sexo"
                :nascimento.sync="nascimento"
                v-if="tipo == 'fisica'"
              />

              <div class="form-row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="telefone">Telefone</label>
                    <input
                      v-model="telefone"
                      class="form-control"
                      id="telefone"
                      type="tel"
                      v-mask="['(##) ####-####', '(##) #####-####']"
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="celular">Celular</label>
                    <input
                      v-model="celular"
                      class="form-control"
                      id="celular"
                      type="tel"
                      v-mask="['(##) ####-####', '(##) #####-####']"
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="email">E-mail</label>
                <input v-model="email" class="form-control" id="email" type="email" />
              </div>
              <div class="form-group">
                <label for="foto">Foto</label>
                <input v-model="foto" class="form-control" id="foto" type="url" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <span class="text-danger ml-3" v-if="$v.enderecos.$invalid && $v.enderecos.$dirty"
          >Favor inserir ao menos 1 endereço.</span
        >
        <Enderecos :enderecos.sync="enderecos" />
      </div>
      <div class="form-group d-flex justify-content-end mt-3">
        <a class="btn d-flex align-items-center mr-3" @click="reset">
          Limpar
        </a>

        <button class="btn btn-primary d-flex align-items-center float-right" :disabled="!isValid">
          <font-awesome-icon icon="save" style="margin-right: 10px;" />
          Salvar
        </button>
      </div>
    </form>
    <ModalAlert
      :tipo="tipoModal"
      :mensagem="mensagemModal"
      :show.sync="showModal"
      v-if="showModal"
    />
  </div>
</template>

<script>
import Enderecos from "@/components/Enderecos.vue";
import { required, minLength } from "vuelidate/lib/validators";
import { mask } from "vue-the-mask";
import CadastroPJ from "@/components/CadastroPJ.vue";
import CadastroPF from "@/components/CadastroPF.vue";
import ModalAlert from "@/components/ModalAlert.vue";
import axios from "axios";
import validateCpfCnpj from "../../utils/validators";
import EventBus from "../../plugins/event-bus";

export default {
  name: "Cadastro",
  components: {
    Enderecos,
    CadastroPJ,
    CadastroPF,
    ModalAlert
  },
  data() {
    return {
      id: "",
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
      enderecos: [],
      showModal: false,
      tipoModal: "alert-success",
      mensagemModal: "Dados gravados com sucesso!"
    };
  },
  validations() {
    return this.tipo === "juridica"
      ? {
          nome: { required },
          razao: { required },
          cnpj: { required, isCNPJ: validateCpfCnpj },
          enderecos: { required, minLength: minLength(1) }
        }
      : {
          nome: { required },
          nascimento: { required },
          sexo: { required },
          cpf: { required, isCPF: validateCpfCnpj },
          enderecos: { required, minLength: minLength(1) }
        };
  },
  directives: { mask },
  methods: {
    addAddress(address) {
      this.enderecos.push(address);
      this.addNewAddress = false;
    },
    cancelAddress() {
      this.addNewAddress = false;
    },
    removeAddress(index) {
      this.enderecos.pop(index);
    },
    changeType() {
      if (this.tipo === "fisica") {
        this.cnpj = "";
        this.razao = "";
      } else {
        this.cpf = "";
        this.nascimento = "";
        this.sexo = "";
      }
    },
    save() {
      EventBus.$emit("validate");
      this.$v.$touch();
      if (this.isValid) {
        const body =
          this.tipo === "fisica"
            ? {
                tipo: this.tipo,
                nome: this.nome,
                cpf: this.cpf,
                sexo: this.sexo,
                nascimento: this.nascimento,
                email: this.email,
                telefone: this.telefone,
                celular: this.celular,
                foto: this.foto,
                enderecos: this.enderecos
              }
            : {
                tipo: this.tipo,
                nome: this.nome,
                razao: this.razao,
                cnpj: this.cnpj,
                email: this.email,
                telefone: this.telefone,
                celular: this.celular,
                foto: this.foto,
                enderecos: this.enderecos
              };
        if (this.id === "") {
          this.post({ ...body });
        } else {
          this.put({ ...body });
        }
        this.$store.dispatch("generateList");
      }
    },
    post(data) {
      axios
        .post(`${this.$store.state.baseUrl}`, {
          ...data
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
    put(data) {
      axios
        .put(`${this.$store.state.baseUrl}/${this.id}`, {
          ...data
        })
        .then(response => {
          if (response.status === 200) {
            // eslint-disable-next-line no-underscore-dangle
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
    reset() {
      this.tipo = "fisica";
      this.nome = "";
      this.cpf = "";
      this.sexo = "";
      this.nascimento = "";
      this.razao = "";
      this.cnpj = "";
      this.email = "";
      this.telefone = "";
      this.celular = "";
      this.foto = "";
      this.enderecos = [];
      EventBus.$emit("reset");
      this.$refs.nome.focus();
    },
    load(id) {
      // this.reset();
      axios({
        url: `${this.$store.state.baseUrl}/${id}`,
        method: "get"
      })
        .then(response => {
          if (response.status === 200) {
            const pessoa = { ...response.data };
            if (pessoa.tipo === "fisica") {
              this.tipo = pessoa.tipo;
              this.nome = pessoa.nome;
              this.cpf = pessoa.cpf;
              this.sexo = pessoa.sexo;
              this.nascimento = pessoa.nascimento;
              this.email = pessoa.email;
              this.telefone = pessoa.telefone;
              this.celular = pessoa.celular;
              this.foto = pessoa.foto;
              this.enderecos = pessoa.enderecos;
            } else {
              this.tipo = pessoa.tipo;
              this.nome = pessoa.nome;
              this.razao = pessoa.razao;
              this.cnpj = pessoa.cnpj;
              this.email = pessoa.email;
              this.telefone = pessoa.telefone;
              this.celular = pessoa.celular;
              this.foto = pessoa.foto;
              this.enderecos = pessoa.enderecos;
            }
            this.id = id;
          }
        })
        .finally(() => {
          EventBus.$emit("load");
        });
    }
  },
  created() {
    if (this.$route.params.id) this.load(this.$route.params.id);
  },
  // watch: {
  //   enderecos() {
  //     EventBus.$emit("load");
  //   }
  // },
  computed: {
    isValid() {
      return !this.$v.$invalid;
    }
  }
};
</script>

<style src="./style.scss" lang="scss" />
