<template>
  <div class="col-sm-12">
    <div class="card">
      <div class="card-header d-flex align-items-center">
        <div class="col-md">
          <font-awesome-icon icon="map-marker-alt" />
          Endereços <span class="text-danger">*</span>
          <span class="badge badge-info" style="margin-left:10px">{{ localEnderecos.length }}</span>
        </div>
        <div class="col-md text-right">
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#modalExemplo"
            @click="addNewAddress = true"
          >
            <font-awesome-icon icon="plus" style="margin-right:0" />
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="col-md">
          <ul class="list-group">
            <li class="list-group-item" v-for="(endereco, index) in localEnderecos" :key="index">
              <div class="row">
                <div class="col-11">
                  <div class="col-md">
                    {{ endereco.logradouro }}, {{ endereco.numero }},
                    {{ endereco.complemento }}
                  </div>
                  <div class="col-md">
                    {{ endereco.bairro }}, {{ endereco.cidade }} - {{ endereco.uf }} -
                    {{ endereco.cep }}
                  </div>
                </div>
                <div class="col-1  d-flex align-items-center justify-content-center">
                  <button type="button" class="btn btn-danger" @click="removeAddress(index)">
                    <font-awesome-icon icon="trash-alt" style="margin-right:0;" />
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <Endereco @addAddress="addAddress" @close="cancelAddress" v-if="addNewAddress" />
      </div>
    </div>
  </div>
</template>

<script>
import Endereco from "./Endereco.vue";

export default {
  name: "Enderecos",
  components: {
    Endereco
  },
  data() {
    return {
      localEnderecos: [],
      addNewAddress: false
    };
  },
  props: {
    enderecos: Array
  },
  methods: {
    addAddress(address) {
      this.localEnderecos.push(address);
      this.addNewAddress = false;
    },
    cancelAddress() {
      this.addNewAddress = false;
    },
    removeAddress(index) {
      this.localEnderecos.pop(index);
    }
  },
  created() {
    this.localEnderecos = this.enderecos;
  },
  watch: {
    localEnderecos(newValue) {
      this.$emit("update:enderecos", newValue);
    }
  }
};
</script>
