<template>
  <div>
    <table id="tabelaPF" class="table table-hover" width="100%">
      <thead>
        <tr>
          <th
            class="sort"
            scope="col"
            v-for="(header, index) in headers"
            :key="index"
            @click="sort(header.dataName)"
          >
            {{ header.name }}
            <font-awesome-icon
              style="color: '#ccc'"
              v-if="currentSort === header.dataName"
              :icon="iconSortDir"
            />
          </th>
          <th scope="col">
            Opções
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sortedList" :key="item[itemsKey]">
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
    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-primary" style="margin-right:10px" @click="prevPage">
        <font-awesome-icon icon="chevron-left" />
      </button>
      <button type="button" class="btn btn-primary" @click="nextPage">
        <font-awesome-icon icon="chevron-right" />
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabelaPessoas",
  data() {
    return {
      currentSort: "",
      currentSortDir: "asc",
      pageSize: 3,
      currentPage: 1,
      iconSortDir: "sort-amount-down-alt"
    };
  },
  props: {
    headers: Array,
    items: Array,
    itemsKey: String
  },
  created() {
    if (this.headers.length > 0) this.currentSort = this.headers[0].dataName;
  },
  methods: {
    nextPage() {
      if (this.currentPage * this.pageSize < this.items.length) this.currentPage += 1;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage -= 1;
    },
    sort(s) {
      console.log(`Ordem: ${s}`);
      // if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
        this.iconSortDir =
          this.currentSortDir === "asc" ? "sort-amount-down-alt" : "sort-amount-up-alt";
      }
      this.currentSort = s;
    },
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
    },
    compare(a, b) {
      // Use toUpperCase() to ignore character casing
      const bandA = a.band.toUpperCase();
      const bandB = b.band.toUpperCase();

      let comparison = 0;
      if (bandA > bandB) {
        comparison = 1;
      } else if (bandA < bandB) {
        comparison = -1;
      }
      return comparison;
    }
  },
  computed: {
    sortedList() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.items
        .sort((a, b) => {
          const itemA = a[this.currentSort].toUpperCase();
          const itemB = b[this.currentSort].toUpperCase();
          let comparison = 0;
          if (itemA > itemB) {
            comparison = this.currentSortDir === "desc" ? -1 : 1;
          } else if (itemA < itemB) {
            comparison = this.currentSortDir === "desc" ? 1 : -1;
          }
          return comparison;

          // let modifier = 1;
          // if (this.currentSortDir === "desc") modifier = -1;
          // if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          // if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          // return 0;
        })
        .filter((row, index) => {
          const start = (this.currentPage - 1) * this.pageSize;
          const end = this.currentPage * this.pageSize;
          return index >= start && index < end;
        });
    }
  }
};
</script>
