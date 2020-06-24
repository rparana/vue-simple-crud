<template>
  <table id="tabelaPF" class="table table-hover" width="100%">
    <thead>
      <tr>
        <th scope="col" v-for="(header, index) in headers" :key="index">
          {{ header.name }}
        </th>
        <th scope="col">
          Opções
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item[itemsKey]">
        <td v-for="(header, index) in headers" :key="item[itemsKey] + index">
          {{ item[header.dataName] }}
        </td>
        <td class="d-flex justify-content-around">
          <button
            type="button"
            class="btn btn-info"
            style="width:44px;"
            @click="editPerson(item[itemsKey])"
          >
            <font-awesome-icon icon="edit" />
          </button>
          <button
            type="button"
            class="btn btn-danger"
            style="width:44px;"
            @click="deletePerson(item[itemsKey])"
          >
            <font-awesome-icon icon="trash-alt" />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: "TabelaPessoas",
  props: {
    headers: Array,
    items: Array,
    itemsKey: String
  },
  methods: {
    formatDate(date) {
      const dt = new Date(date);
      const day = dt
        .getDate()
        .toString()
        .padStart(2, "0");
      const month = (dt.getMonth() + 1).toString().padStart(2, "0");
      return `${day}/${month}/${dt.getFullYear()}`;
    },
    editPerson(id) {
      this.$router.push({
        path: `/cadastro/${id}`
      });

      this.$store.dispatch("getPerson", id);
    },
    deletePerson(id) {
      this.$store.dispatch("deletePerson", id);
    }
  }
};
</script>
