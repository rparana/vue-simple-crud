<template>
  <div class="modal fade bd-example-modal-lg show " style="display:block;">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div :class="tipo" class="alert " role="alert" style="margin-bottom:0">
          {{ mensagem }}
          <a href="#" class="close" @click="localShow = !localShow">
            <span aria-hidden="true">×</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ModalAlert",
  data() {
    return { localShow: false };
  },
  created() {
    this.localShow = this.show;
  },
  props: {
    tipo: {
      type: String,
      default: "alert-success"
    },
    mensagem: {
      type: String,
      default: ""
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      console.log("close");
      // this.$emit("close");
    }
  },
  watch: {
    localShow(newValue) {
      this.$emit("update:show", newValue);
    }
  }
};
</script>
