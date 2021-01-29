<template>
  <div class="posts">
    <HeaderNav />
    <h1>Articles disponibles<br />à la lecture et aux commentaires</h1>
    <article v-for="post in posts" :key="post.id">
      <router-link :to="{ name: 'PostDetails', params: { id: post.id } }">
        <h3>{{ post.title }} publié par {{ post.user.pseudo }}</h3>
        <h4>le: {{ post.createdAt }}</h4>
        <p>{{ post.text }}</p>
      </router-link>
    </article>
  </div>
</template>

<script>
import HeaderNav from "../components/header-nav";
import { AJAX_GET_POST } from "../services/ajax";
import { FORMAT_DATE } from "../services/utilities";

export default {
  name: "posts",
  components: {
    HeaderNav,
  },
  props: [],
  mounted() {
    this.storedData = JSON.parse(localStorage.getItem("groupomania_P7"));

    AJAX_GET_POST(
      "http://localhost:3000/api/post/readAll/" + this.storedData.userId,
      "GET",
      null
    )
      .then((posts) => {
        console.log("Articles récupérés !", posts);

        this.posts = posts.map((post) => {
          post.createdAt = FORMAT_DATE(post.createdAt);
          return post;
        });
      })
      .catch((err) => {
        console.log("Une erreur est survenue !", err);
      });
  },
  data() {
    return {
      posts: [],
      storedData: {},
    };
  },
  methods: {},
  computed: {},
};
</script>

<style>
.posts {
  background-color: rgb(241, 239, 239);
}
.posts article {
  box-shadow: 1px 1px 4px rgb(49, 49, 49);
  margin: 10px;
  padding: 10px;
  background-color: #c0bebe;
}

a {
  text-decoration: none;
  color: black;
}
h3 {
  text-transform: uppercase;
}
button {
  background-color: rgb(245, 201, 230);
  font-style: italic;
}

h1 {
  color: rgb(72, 73, 73);
  text-align: center;
}
</style>
