<template>
  <div class="comments-list">
    <form @submit="createComment">
      <p>N'hésiter pas et commenter cet article</p>
      <textarea placeholder="Description" v-model="newComment.text"></textarea>
      <input class="publierButton" type="submit" value="Publier ce commentaire" />
    </form>
    <h3>commentaires publiés :</h3>
    <article v-for="comment in comments" :key="comment.id">
      <!--LA LIAISON ENTRE CHAQUE comment DE comments-Pour expliquer à Vue comment suivre l’identité de chaque nœud, utiliser un key   -->
      <h3>
        Publié par {{ comment.user.pseudo }} - le: {{ comment.createdAt }}
      </h3>
      <p>{{ comment.text }}</p>
      <button
        v-if="storedData.userId == comment.userId"
        @click="deleteComment(comment.id)"
      >
        Supprimer
      </button>
      <button
        v-if="comment.userId != storedData.userId"
        @click="signalComment(comment.id)"
      >
        Signaler
      </button>
    </article>
  </div>
</template>

<script>
import { AJAX_GET_POST } from "../services/ajax";
import { FORMAT_DATE } from "../services/utilities";

export default {
  name: "Comments",
  props: ["postId"],
  data() {
    return {
      newComment: {
        text: "",
        userId: null,
        postId: null,
      },
      storedData: {},
      comments: [],
    };
  },
  mounted() {
    this.storedData = JSON.parse(localStorage.getItem("groupomania_P7"));
    this.loadComments();
  },

  methods: {
    loadComments() {
      AJAX_GET_POST(
        "http://localhost:3000/api/comment/readAll/" +
          this.postId +
          "/" +
          this.storedData.userId,
        "GET",
        null
      )
        .then((comments) => {
          console.log("Commentaires récupérés !", comments);
          this.comments = comments.map((comment) => {
            comment.createdAt = FORMAT_DATE(comment.createdAt);
            return comment;
          });
        })
        .catch((err) => {
          console.log("Une erreur est survenue !", err);
        });
    },
    createComment(evt) {
      evt.preventDefault();
      if (this.newComment.text.trim().length < 2) {
        alert("Votre commentaire doit contenir au moins deux caractères !");
        return;
      }
      const dataToSend = {
        text: this.newComment.text,
        userId: this.storedData.userId,
        postId: this.postId,
      };

      AJAX_GET_POST(
        "http://localhost:3000/api/comment/create/" + this.storedData.userId,
        "POST",
        dataToSend
      )
        .then((response) => {
          console.log("Nouveau commentaire ajouté !", response);

          this.newComment.text = "";
          const newComment = { ...response, user: { pseudo: "Vous" } };
          newComment.createdAt = FORMAT_DATE(newComment.createdAt);
          this.comments.splice(0, 0, newComment);
        })
        .catch((err) => {
          console.log("Une erreur est survenue !", err);
        });
    },

    deleteComment(commentId) {
      AJAX_GET_POST(
        "http://localhost:3000/api/comment/delete/" +
          commentId +
          "/" +
          this.storedData.userId,
        "DELETE",
        null
      )
        .then((success) => {
          console.log(success);
          alert("commentaire supprimé");
          this.$router.push({ path: "/articles" });
        })
        .catch((err) => {
          console.log("Une erreur est survenue !", err);
        });
    },

    signalComment(commentId) {
      AJAX_GET_POST(
        "http://localhost:3000/api/comment/signal/" +
          commentId +
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
  },
};
</script>


<style scoped>
form p {
  margin-top: 20px;

  font-size: 20px;
}
form textarea {
  padding-top: 10px;
  padding-bottom: 50px;
  padding-right: 50px;
  margin-right: 20px;
  margin-left: 20px;
  width: 400px;
}
form {
  display: flex;
  flex-direction: column;
 
  align-items: center;
  border: grey 2px solid;
  width: 500px;
  margin-top: 20px;
}
.comments-list {
  background-color: rgb(241, 239, 239);
  
  display: flex;
  flex-direction: column;
  align-items: center;
}
.comments-list form {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
.comments-list input {
  
  font-style: italic;
  height: 20px;
  width: 300px;
  margin-top: 10px;
}
form h3 {
  text-transform: lowercase;
  margin-left: 20px;
  margin-top: 40px;
}
form input {
  margin-bottom: 10px;
  
}
.publierButton {
  background-color: rgb(25, 15, 172);
  color: white;
}
article p {
  
  width: 700px;
}
article button {
  font-size:14px;
  background-color: rgb(247, 117, 117);
}
@media all and (max-width: 761px) {
article p {  
  width: 500px;
}
}
@media all and (max-width: 565px) {
article p {  
  width: 400px;
}
form textarea {
  padding-top: 10px;
  padding-bottom: 50px;
  padding-right: 50px;
  margin-right: 20px;
  margin-left: 20px;
  width: 250px;
}
form {
  display: flex;
  flex-direction: column;
 
  align-items: center;
  border: grey 2px solid;
  width: 350px;
  margin-top: 20px;
}
}
@media all and (max-width: 457px) {
article p {  
  width: 200px;
}
form textarea {
  padding-top: 10px;
  padding-bottom: 50px;
  padding-right: 50px;
  margin-right: 20px;
  margin-left: 20px;
  width: 100px;
}
form {
  display: flex;
  flex-direction: column;
 
  align-items: center;
  border: grey 2px solid;
  width: 200px;
  margin-top: 20px;
}
.comments-list input {
  
  font-style: italic;
  height: 20px;
  width: 150px;
  margin-top: 10px;
}
}
</style>
