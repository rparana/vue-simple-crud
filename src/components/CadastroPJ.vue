<template>
  <div class="form-row">
    <div class="col-sm-8">
      <div class="form-group">
        <label for="razao">Razão Social <span class="text-danger">*</span></label>
        <input v-model="localRazao" class="form-control" id="razao" type="cnpj" />
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
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mask } from "vue-the-mask";

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
  created() {
    this.localRazao = this.razao;
    this.localCNPJ = this.cnpj;
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
