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
        />
      </div>
    </div>
    <div class="col-sm-4">
      <div class="form-group">
        <label for="sexo">Sexo <span class="text-danger">*</span></label>
        <select v-model="localSexo" class="form-control" id="sexo" type="text">
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select>
      </div>
    </div>
    <div class="col-sm-4">
      <div class="form-group">
        <label for="nascimento">Data Nascimento <span class="text-danger">*</span></label>
        <input v-model="localNascimento" class="form-control" id="nascimento" type="date" />
      </div>
    </div>
  </div>
</template>
<script>
import { mask } from "vue-the-mask";

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
  created() {
    this.localCPF = this.cpf;
    this.localSexo = this.sexo;
    this.localNascimento = this.nascimento;
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
