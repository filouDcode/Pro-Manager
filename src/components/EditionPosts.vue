<template>
<div>
  <div id="edit">
    <div id="com-space"></div>
    <div>
      <button class="btn btn-primary btn-sm" v-on:click="editPo()">
        Mettre à jour le Post
      </button>
      <label>Titre</label><br />
      <input type="text" v-model="formEd.title" />
    </div>
    <!-- <div>
        <label>Description</label><br>
        <input type="text" v-model="formEd.content" />
      </div> -->
    <div>
      <label>Catégories</label><br />
      <select v-model="formEd.categories">
        <option v-bind:value="categorie.id" v-for="categorie in categories" v-bind:key="categorie.id">
          {{ categorie.name }}
        </option>
      </select>
    </div>
  </div>
</div>
</template>

<script>
import api from "@/apis/api.js";

export default {
  props: ["idedit", "title"],
  data() {
    return {
      categories: [],
      formEd: {
        title: this.title,
        // content: this.content,
        categories: "",
      },
    };
  },
  mounted() {
    api
      .getcategories()
      .then((response) => {
        this.categories = response.data;
      })
      .catch((error) => {
        console.log("Error :", error.response);
      });
  },
  methods: {
    editPo() {
      api
        .editPo(this.idedit, this.formEd)
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

<style scoped>
#edit {
  font-weight: bold;
  margin-bottom: 2px;
}

/* #edit label {
  width: 90px;
} */
#com-space {
  height: 5px;
  width: 100%;
  margin: auto;
  margin-bottom: 0.5em;
  background-color: rgb(87, 87, 87);
  border-radius: 5px;
}
</style>
