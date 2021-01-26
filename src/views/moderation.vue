<template>
  <div class="posts">
    <HeaderNav />
    <h1>Elements signalés</h1>

    <h2>Articles</h2>
    <article v-for="post in posts" :key="post.id + '_posts'">
      <router-link :to="{ name: 'PostDetails', params: { id: post.id } }">
        <h3>{{ post.title }}</h3>
        <p>{{ post.text }}</p>
      </router-link>

      <button class="signalButton" @click="unsignal(post.id, 'post')">
        Annuler signalement
      </button>
      <button class="deleteButton" @click="delete_(post.id, 'post')">
        Supprimer
      </button>
    </article>
    <hr />
    <h2>Commentaires</h2>
    <article v-for="comment in comments" :key="comment.id + '_comments'"> 
      <h3>{{ comment.title }}</h3>
      <p>{{ comment.text }}</p>
      <button @click="unsignal(comment.id, 'comment')">
        Annuler signalement
      </button>
      <button @click="delete_(comment.id, 'comment')">Supprimer</button>
    </article>
  </div>
</template>

<script>
import HeaderNav from "../components/header-nav";
import { AJAX_GET_POST } from "../services/ajax";

export default {
  name: "moderation",
  components: {
    HeaderNav,
  },
  props: [],
  mounted() {
    this.storedData = JSON.parse(localStorage.getItem("groupomania_P7"));

    this.loadSignaled("post");
    this.loadSignaled("comment");
  },
  data() {
    return {
      posts: [],
      comments: [],
      storedData: {},
    };
  },
  methods: {
    loadSignaled(type) {
      console.log(type);
      const url =
        "http://localhost:3000/api/" +
        type +
        "/readSignaled/" +
        this.storedData.userId +
        "/" +
        this.storedData.isAdmin;
      console.log(url);
      AJAX_GET_POST(url, "GET", null)
        .then((items) => {
          console.log(items);
          if (type === "post") {
            this.posts = items;
          } else {
            this.comments = items;
          }
        })
        .catch((err) => {
          console.log("Une erreur est survenue !", err);
        });
    },
    unsignal(id, type) {
      AJAX_GET_POST(
        "http://localhost:3000/api/" +
          type +
          "/signal/" +
          id +
          "/unsignal/" +
          this.storedData.userId,

        "PUT",
        null
      )
        .then((success) => {
          if (type == "comment") {
            const index = this.comments.findIndex(
              (comment) => comment.id == id
            );
            this.comments.splice(index, 1);
          } else {
            const index = this.posts.findIndex((post) => post.id == id);
            this.posts.splice(index, 1);
          }
          console.log(success);
          alert("signalement annulé");
        })
        .catch((err) => {
          console.log("Une erreur est survenue !", err);
        });
    },

    delete_(id, type) {
      AJAX_GET_POST(
        "http://localhost:3000/api/" +
          type +
          "/delete/" +
          id +
          "/" +
          this.storedData.userId,

        "DELETE",
        null
      )
        .then((res) => {
          if (type == "comment") {
            const index = this.comments.findIndex(
              (comment) => comment.id == id
            );
            this.comments.splice(index, 1);
          } else {
            const index = this.posts.findIndex((post) => post.id == id);
            this.posts.splice(index, 1);
          }

          console.log(res);
          alert("article ou commentaire supprimé");
        })
        .catch((err) => {
          console.log("Une erreur est survenue !", err);
        });
    },
  },
  computed: {},
};
</script>

<style>
article {
  box-shadow: 1px 1px 4px silver;
  margin: 10px 10px 50px 10px;
  padding: 10px;
  background-color: #f8f8f8;
  position: relative;
}

a {
  text-decoration: none;
  color: black;
}
</style>
