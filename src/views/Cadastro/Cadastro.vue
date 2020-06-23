<template>
  <div class="container mt-5 mb-5">
    <form action="#" @submit.prevent="save()">
      <div class="row mt-5">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-header d-flex align-items-center">
              <font-awesome-icon icon="user-alt" /> Cadastro
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
                <input v-model="nome" class="form-control" id="nome" type="text" required />
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
                    <input v-model="telefone" class="form-control" id="telefone" type="tel" />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="celular">Celular</label>
                    <input v-model="celular" class="form-control" id="celular" type="tel" />
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
        <Enderecos :enderecos.sync="enderecos" />
      </div>
      <div class="form-group d-flex justify-content-end mt-3">
        <button class="btn btn-primary d-flex align-items-center float-right">
          <font-awesome-icon icon="save" />
          Salvar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Enderecos from "@/components/Enderecos.vue";
import { required, minLength } from "vuelidate/lib/validators";
import { mask } from "vue-the-mask";
import CadastroPJ from "@/components/CadastroPJ.vue";
import CadastroPF from "@/components/CadastroPF.vue";
import validateCpfCnpj from "../../utils/validators";

export default {
  name: "Cadastro",
  components: {
    Enderecos,
    CadastroPJ,
    CadastroPF
  },
  data() {
    return {
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
    valideCPF() {
      if (this.cpf !== "") this.$v.cpf.$touch();
      if (this.$v.cpf.$invalid) this.cpf = "";
    },
    save() {}
  },
  computed: {
    isValid() {
      return !this.$v.invalid;
    }
  }
};
</script>

<style src="./style.scss" lang="scss" />
