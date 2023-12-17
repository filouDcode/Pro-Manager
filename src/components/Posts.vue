<template>
<div id="notes">
  <article v-for="post in posts" v-bind:key="post.id">
    <div id="post" @click="openPost(post.id)">
      <p id="text">{{ post.title.rendered.substring(0, 60) }}</p>
    </div>
  </article>

  <ShowPost v-if="showpost" @closePost="closePost" :pos="idpost" />

  <input type="text" v-model="formPo.title" placeholder="Créer un Post" />
  <button class="btn btn-primary" v-on:click="createPo()">➕</button>
</div>
</template>

<script>
import api from "@/apis/api.js";
import ShowPost from "@/components/ShowPost.vue";

export default {
  props: ["cat"],
  components: {
    ShowPost,
  },
  data() {
    return {
      posts: [],
      showpost: false,
      idpost: "",
      formPo: {
        title: "",
        status: "publish",
        categories: this.cat,
      },
    };
  },

  mounted() {
    api
      .getposts(this.cat)
      .then((response) => {
        this.posts = response.data;
      })
      .catch((error) => {
        console.log("Error :", error.response);
      });
  },
  methods: {
    createPo() {
      api
        .createPo(this.formPo)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log("Error :", error.response);
        });
    },
    openPost(id) {
      this.idpost = id;
      this.showpost = true;
    },
    closePost() {
      this.pos = "";
      this.showpost = false;
    },
  },
};
</script>

<style scoped>
#post {
  background: white;
  border-radius: 5px;
  margin: 0.5em 0;
}

#post :hover {
  cursor: pointer;
}
</style>
