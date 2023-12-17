<template>
<div id="bg">
  <div class="edit">
    <input type="text" placeholder="Nouvelle catégorie" v-model="formEd.name" />
    <button class="btn btn-warning btn-sm" v-on:click="editPo">
      <b>Mettre à jour</b>
    </button>
  </div>
</div>
</template>

<script>
import api from "@/apis/api.js";

export default {
  props: ["cat"],
  data() {
    return {
      formEd: {
        name: "",
      },
    };
  },
  mounted() {
    api
      .getcategories()
      .then((response) => {
        this.categories = response.data;
        console.log(this.categories);
      })
      .catch((error) => {
        console.log("Error :", error.response);
      });
  },
  methods: {
    editPo() {
      api
        .editCat(this.cat, this.formEd)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log("Error :", error.response);
        });
    },
  },
};
</script>
,

<style scoped>
input {
  margin: auto 3mm;
  border-radius: 5px;
  border-style: none;
}

.edit {
  font-weight: bold;
  margin-bottom: 2px;
}
</style>
