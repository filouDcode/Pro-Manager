<template>
<div>
  <div id="back">
    <div class="post">
      <!-- Boutton -->
      <span>
        <button id="btn" class="btn btn-secondary" @click="closePost">
          <b>Retour</b>
        </button>
        <button id="btn" @click="deletePo(pos)" class="btn btn-light">
          🗑️
        </button>
        <button id="btn" @click="openEdit(pos)" class="btn btn-light">
          <span v-if="showedit">Fermer</span><span v-else>✏️</span>
        </button></span>
      <div>
        <p>
          <strong>{{ title }}</strong>
        </p>
        <!-- <p>{{ description }}</p> -->
      </div>

      <EditionPosts v-if="showedit" :idedit="idedit" :title="title" />

      <div id="com-space"></div>
      <p>Les Commentaires:</p>
      <div>
        <span><input type="text" v-model="formc.content" placeholder="Créer nouveau commentaire" class="addInput" />
          <button @click="comment()" class="btn btn-primary btn-sm">
            Ajouter Nouveau Commentaire
          </button></span>
        <span v-if="showeditC"><input type="text" v-model="formedit.content" placeholder="Editer le commentaire" class="editInput" /><button @click="submiteditC(idc)" class="btn btn-primary btn-sm">
            Editer le commentaire
          </button></span>
        <div id="com" v-for="com in coms" v-bind:key="com.id">
          <a @click="deleteCo(com.id)">Effacer</a> |
          <a @click="editC(com.id)">Edition</a>
          <p>De : {{ com.author_name }}</p>

          <p v-html="com.content.rendered"></p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import api from "@/apis/api.js";
import EditionPosts from "@/components/EditionPosts.vue";

export default {
  components: {
    EditionPosts,
  },
  props: ["pos"],
  data() {
    return {
      description: "",
      title: "",
      idedit: "",
      showedit: false,
      showeditC: false,
      idc: "",
      coms: [],
      formc: {
        content: "",
      },
      formedit: {
        content: "",
      },
    };
  },
  mounted() {
    api
      .getpost(this.pos)
      .then((response) => {
        this.description = response.data.content.rendered;
        this.title = response.data.title.rendered;
      })
      .catch((error) => {
        console.log("Error :", error.response);
      }),
      api
      .getcoms(this.pos)
      .then((response) => {
        this.coms = response.data;
      })
      .catch((error) => {
        console.log("Error :", error.response);
      });
  },
  methods: {
    deletePo(id) {
      api
        .deletePo(id)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log("Error :", error.response);
        });
    },
    closePost() {
      this.$emit("closePost");
    },
    openEdit(id) {
      if (this.showedit === true) {
        this.showedit = false;
      } else {
        this.showedit = true;
        this.idedit = id;
      }
    },
    comment() {
      api
        .comment(this.pos, this.formc)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log("Error :", error.response);
        });
    },
    deleteCo(id) {
      api
        .deleteCo(id)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log("Error :", error.response);
        });
    },
    editC(id) {
      this.showeditC = true;
      this.idc = id;
    },
    submiteditC(id) {
      api
        .editCo(id, this.formedit)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log("Error :", error.response);
        });
      this.showeditC = false;
      this.idc = "";
      this.formedit = {
        content: ""
      };
    },
  },
};
</script>

<style scoped>
.addInput {
  margin-bottom: 10px;
  border-radius: 5px;
}

#back {
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 0px);
  min-height: calc(100vh - 0px);
  background: rgba(0, 0, 0, 0.8);
}

.post {
  background: rgb(225, 225, 225);
  width: 80%;
  max-height: 600px;
  padding: 10px;
  margin: 10px 0;
  overflow-y: scroll;
}

#btn {
  margin: -5px 5px;
  margin-left: auto;
}

#com-space {
  height: 5px;
  width: 100%;
  margin: auto;
  background-color: rgb(87, 87, 87);
  border-radius: 5px;
}

#com {
  background: grey;
  margin: 0.5em;
  border-radius: 5px;
  color: rgb(224, 224, 224);
  padding: 5px;
}

#com a {
  color: ivory;
  cursor: pointer;
  text-decoration: underline;
}

.addInput {
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>
