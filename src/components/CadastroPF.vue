<template>
  <div class="form-row">
    <div class="col-sm-4">
      <div class="form-group">
        <label for="cpf">CPF <span class="text-danger">*</span></label>
        <input
          v-model="localCPF"
          id="cpf"
          class="form-control"
          type="text"
          v-mask="'###.###.###-##'"
          :class="{ 'is-invalid': $v.localCPF.$invalid && $v.localCPF.$dirty }"
          @input="$v.localCPF.$touch()"
        />
      </div>
    </div>
    <div class="col-sm-4">
      <div class="form-group">
        <label for="sexo">Sexo <span class="text-danger">*</span></label>
        <select
          v-model="localSexo"
          class="form-control"
          id="sexo"
          type="text"
          :class="{ 'is-invalid': $v.localSexo.$invalid && $v.localSexo.$dirty }"
          @input="$v.localSexo.$touch()"
        >
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select>
      </div>
    </div>
    <div class="col-sm-4">
      <div class="form-group">
        <label for="nascimento">Data Nascimento <span class="text-danger">*</span></label>
        <input
          v-model="localNascimento"
          class="form-control"
          id="nascimento"
          type="date"
          :class="{ 'is-invalid': $v.localNascimento.$invalid && $v.localNascimento.$dirty }"
          @input="$v.localNascimento.$touch()"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import { mask } from "vue-the-mask";
import validateCpfCnpj, { isDate } from "../utils/validators";
import EventBus from "../plugins/event-bus";

export default {
  name: "CadastroPF",
  data() {
    return {
      localCPF: "",
      localSexo: "",
      localNascimento: ""
    };
  },
  directives: { mask },
  props: {
    cpf: {
      type: String,
      default: ""
    },
    sexo: {
      type: String,
      default: ""
    },
    nascimento: {
      type: String,
      default: ""
    }
  },
  validations() {
    return {
      localCPF: { required, isCPF: validateCpfCnpj },
      localSexo: { required },
      localNascimento: {
        required,
        isdate: isDate
      }
    };
  },
  methods: {
    reset() {
      this.localCPF = "";
      this.localSexo = "";
      this.localNascimento = "";
    },
    sync() {
      this.localCPF = this.cpf;
      this.localSexo = this.sexo;
      this.localNascimento = this.nascimento;
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
    localCPF(newValue) {
      this.$emit("update:cpf", newValue);
    },
    localSexo(newValue) {
      this.$emit("update:sexo", newValue);
    },
    localNascimento(newValue) {
      this.$emit("update:nascimento", newValue);
    }
  }
};
</script>
