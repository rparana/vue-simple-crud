<template>
  <div class="form-row">
    <div class="col-sm-8">
      <div class="form-group">
        <label for="razao">Razão Social <span class="text-danger">*</span></label>
        <input
          v-model="localRazao"
          class="form-control"
          id="razao"
          type="cnpj"
          :class="{ 'is-invalid': $v.localRazao.$invalid && $v.localRazao.$dirty }"
          @input="$v.localRazao.$touch()"
        />
      </div>
    </div>
    <div class="col-sm-4">
      <div class="form-group">
        <label for="cnpj">CNPJ <span class="text-danger">*</span></label>
        <input
          v-model="localCNPJ"
          class="form-control"
          id="cnpj"
          type="text"
          v-mask="'##.###.###/####-##'"
          :class="{ 'is-invalid': $v.localCNPJ.$invalid && $v.localCNPJ.$dirty }"
          @input="$v.localCNPJ.$touch()"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import { mask } from "vue-the-mask";
import validateCpfCnpj from "../utils/validators";
import EventBus from "../plugins/event-bus";

export default {
  name: "CadastroPJ",
  data() {
    return {
      localRazao: "",
      localCNPJ: ""
    };
  },
  directives: { mask },
  props: {
    cnpj: {
      type: String,
      default: ""
    },
    razao: {
      type: String,
      default: ""
    }
  },
  validations() {
    return {
      localCNPJ: { required, isCPF: validateCpfCnpj },
      localRazao: { required }
    };
  },
  methods: {
    reset() {
      this.localRazao = "";
      this.localCNPJ = "";
    },
    sync() {
      this.localRazao = this.razao;
      this.localCNPJ = this.cnpj;
    }
  },
  created() {
    this.sync();
  },
  mounted() {
    EventBus.$on("validate", () => this.$v.$touch());
    EventBus.$on("load", this.sync);
    EventBus.$on("reset", this.reset);
  },

  watch: {
    localCNPJ(newValue) {
      this.$emit("update:cnpj", newValue);
    },
    localRazao(newValue) {
      this.$emit("update:razao", newValue);
    }
  }
};
</script>
