<template>
  <form class="mt-4" action="#" @submit.prevent="addAddress">
    <div class="form-row">
      <div class="col-sm-4">
        <div class="form-group">
          <label for="cep">Cep</label>
          <div class="input-group">
            <input v-model="cep" class="form-control" id="cep" type="text" v-mask="'##.###-###'" />
            <button
              type="button"
              class="btn btn-primary input-group-append align-items-center"
              @click="getAddressByCep()"
            >
              <font-awesome-icon icon="search" style="margin-right:0" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col-sm-8">
        <div class="form-group">
          <label for="logradouro">Endereço <span class="text-danger">*</span></label>
          <input
            v-model="logradouro"
            class="form-control"
            id="logradouro"
            type="text"
            required
            :class="{ 'is-invalid': $v.logradouro.$invalid && $v.logradouro.$dirty }"
            @input="$v.logradouro.$touch()"
          />
        </div>
      </div>
      <div class="col-sm-2">
        <div class="form-group">
          <label for="numero">Número <span class="text-danger">*</span></label>
          <input
            v-model="numero"
            class="form-control"
            id="numero"
            type="number"
            ref="numero"
            required
            :class="{ 'is-invalid': $v.numero.$invalid && $v.numero.$dirty }"
            @input="$v.numero.$touch()"
          />
        </div>
      </div>
      <div class="col-sm-2">
        <div class="form-group">
          <label for="complemento">Complemento</label>
          <input v-model="complemento" class="form-control" id="complemento" type="text" />
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col-sm-3">
        <div class="form-group">
          <label for="bairro">Bairro</label>
          <input v-model="bairro" class="form-control" id="bairro" type="text" />
        </div>
      </div>
      <div class="col-sm-3">
        <div class="form-group">
          <label for="cidade">Cidade <span class="text-danger">*</span></label>
          <input
            v-model="cidade"
            class="form-control"
            id="cidade"
            type="text"
            required
            :class="{ 'is-invalid': $v.cidade.$invalid && $v.cidade.$dirty }"
            @input="$v.cidade.$touch()"
          />
        </div>
      </div>
      <div class="col-sm-3">
        <div class="form-group">
          <label for="uf">UF <span class="text-danger">*</span></label>
          <input
            v-model="uf"
            class="form-control"
            id="uf"
            type="text"
            required
            :class="{ 'is-invalid': $v.uf.$invalid && $v.uf.$dirty }"
            @input="$v.uf.$touch()"
          />
        </div>
      </div>
    </div>
    <div class="form-group d-flex justify-content-end mt-3">
      <a class="btn d-flex align-items-center mr-3" @click="close">
        Cancelar
      </a>
      <button class="btn btn-primary d-flex align-items-center float-right" :disabled="!isValid">
        Gravar
      </button>
    </div>
  </form>
</template>

<script>
import axios from "axios/dist/axios";
import { mask } from "vue-the-mask";
import { required } from "vuelidate/lib/validators";

export default {
  name: "Endereco",
  data() {
    return {
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      uf: "",
      cep: ""
    };
  },
  validations: {
    logradouro: { required },
    numero: { required },
    cidade: { required },
    uf: { required }
  },
  directives: { mask },
  methods: {
    addAddress() {
      if (this.isValid) {
        this.$emit("addAddress", { ...this.$data });
        this.resetForm();
      }
    },
    close() {
      this.$emit("close");
    },
    resetForm() {
      this.logradouro = "";
      this.numero = "";
      this.complemento = "";
      this.bairro = "";
      this.cidade = "";
      this.uf = "";
      this.cep = "";
    },
    getAddressByCep() {
      const cepLimpo = this.cep.replace(".", "").replace("-", "");
      axios({
        url: `http://viacep.com.br/ws/${cepLimpo}/json/`,
        method: "get"
      }).then(response => {
        if (response.data.erro) {
          console.error("Cep não encontrado!");
        } else {
          this.logradouro = response.data.logradouro;
          this.bairro = response.data.bairro;
          this.cidade = response.data.localidade;
          this.uf = response.data.uf;
          this.$refs.numero.focus();
        }
      });
    }
  },
  computed: {
    isValid() {
      return (
        !this.$v.logradouro.$invalid &&
        !this.$v.cidade.$invalid &&
        !this.$v.uf.$invalid &&
        !this.$v.numero.$invalid
      );
    }
  }
};
</script>

<style></style>
