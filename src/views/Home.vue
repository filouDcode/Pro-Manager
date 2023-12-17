<template>
  <div>
    <div><EditionForm v-if="EditionForm" :cat="cat" /></div>
    <div id="bg">
      <div
        class="cat"
        v-for="categorie in categories"
        v-bind:key="categorie.id"
      >
        <span>
          <button
            id="btn"
            @click="deletecat(categorie.id)"
            class="btn btn-light"
          >
            🗑️
          </button>
          <button class="btn btn-light mod" @click="openEdit(categorie.id)">
            ✏️
          </button>
        </span>

        <p class="text">
          <strong>{{ categorie.name.toUpperCase().substring(0, 18) }}</strong>
        </p>

        <div class="posts">
          <Posts :cat="categorie.id" />
        </div>
      </div>
      <div class="cat">
        <label><strong>Nouvelle Catégorie</strong></label>
        <br />
        <input
          type="text"
          v-model="formCa.name"
          placeholder="Créer une catégorie"
        />
        <button class="btn btn-primary" v-on:click="createCa()">➕</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/apis/api.js";
import Posts from "@/components/Posts.vue";
import EditionForm from "@/components/EditionCategories.vue";

export default {
  components: {
    Posts,
    EditionForm,
  },
  data() {
    return {
      EditionForm: false,
      categories: [],
      cat: "",
      test: "",
      formCa: {
        name: "",
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
    createCa() {
      api
        .createCa(this.formCa)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log("Error :", error.response);
        });
    },
    deletecat(id) {
      api
        .deletecat(id)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log("Error :", error.response);
        });
    },
    openEdit(id) {
      if (this.EditionForm === true) {
        this.EditionForm = false;
      } else {
        this.EditionForm = true;
        this.cat = id;
      }
    },
  },
};
</script>

<style>
body {
  background-image: url("../assets/background-image.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  min-width: auto;
  min-height: 1024px;
}
#bg {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.mod {
  margin-right: 2px;
}

.cat {
  font-size: 1.2rem;
  flex-direction: column;
  background: rgba(211, 211, 211, 0.3);
  /* filter: blur(5px); */
  border-radius: 20px;
  width: 300px;
  min-height: 198px;
  text-align: left;
  margin: 5mm 5mm;
  padding: 3mm;
  overflow-wrap: break-word;
}
input {
  width: 50%;
  margin: 0.1em 0.1em;
  border-radius: 5px;
}
.cat button {
  float: right;
  font-size: 15px;
}
</style>


