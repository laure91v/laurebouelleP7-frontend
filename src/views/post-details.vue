<template>
  <div class="posts" v-if="post.user">
    <HeaderNav />
    <h1>Détails de l'article</h1>

    <div id="post-details-ctnr">
      <h3>{{ post.title }}</h3>
      <p>{{ post.text }}</p>
      <h4>
        - article publié par {{ post.user.pseudo }} le {{ post.createdAt }} -
      </h4>
      <button
        v-if="storedData.userId == post.userId"
        @click="deletePost(post.id)"
      >
        Supprimer
      </button>
      <button
        v-if="storedData.userId != post.userId"
        @click="signalPost(post.id)"
      >
        Signaler
      </button>
    </div>

    <Comments :postId="post.id" />
  </div>
</template>

<script>
import HeaderNav from "../components/header-nav";
import { AJAX_GET_POST } from "../services/ajax";
import Comments from "../components/comments";
import { FORMAT_DATE } from "../services/utilities";

export default {
  name: "post-details",
  props: [],
  components: { Comments, HeaderNav },
  mounted() {
    this.storedData = JSON.parse(localStorage.getItem("groupomania_P7"));
    AJAX_GET_POST(
      "http://localhost:3000/api/post/readOne/" +
        this.$route.params.id +
        "/" +
        this.storedData.userId,
      "GET",
      null
    )
      .then((post) => {
        console.log("Article récupéré !", post);
        post.createdAt = FORMAT_DATE(post.createdAt);
        this.post = post;
      })
      .catch((err) => {
        console.log("Une erreur est survenue !", err);
      });
  },
  data() {
    return {
      post: {},
      storedData: {},
    };
  },
  methods: {
    signalPost(postId) {
      AJAX_GET_POST(
        "http://localhost:3000/api/post/signal/" +
          postId +
          "/signal/" +
          this.storedData.userId,
        "PUT",
        null
      )
        .then((success) => {
          console.log(success);
          alert("signalement fait");
        })
        .catch((err) => {
          console.log("Une erreur est survenue !", err);
        });
    },
    deletePost(postId) {
      AJAX_GET_POST(
        "http://localhost:3000/api/post/delete/" +
          postId +
          "/" +
          this.storedData.userId,
        "DELETE",
        null
      )
        .then((success) => {
          console.log(success);
          alert("article supprimé");
          this.$router.push({ path: "/articles" });
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
  margin: 10px;
  padding: 10px;
  background-color: #f8f8f8;
}
#post-details-ctnr p {
  height: auto;
  width: auto;
  background-color: rgb(202, 181, 181);
  padding: 20px;
  border-radius: 10px;
  margin-left: 20px;
}
#post-details-ctnr h4 {
  font-size: 12px;
  margin-top: 30px;
  margin-left: 20px;
}
#post-details-ctnr h3 {
  margin-left: 20px;
}
#post-details-ctnr button {
  background-color: rgb(247, 117, 117);
}

@media all and (max-width: 892px) {
  #post-details-ctnr p {
    height: auto;
    width: auto;
  }
}
</style>
