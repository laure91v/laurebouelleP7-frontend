<template>
  <div id="signup-main">
    
    <div id="sous">
      <img
      src="../assets/icon-left-font-monochrome-black.png"
      alt="logo gauche"
      title="logo gauche"/>
    <h1>page d'accueil-inscription</h1>
    </div>
    <form @submit="signup">
      <p>
        <label for="pseudo">Choisir un pseudo</label>
        <input v-model="user.pseudo" type="text" id="pseudo" />
      </p>

      <p>
        <label for="email">Votre adresse mail</label>
        <input v-model="user.email" type="email" id="email" />
      </p>

      <p>
        <label for="password">Choisir un mot de passe</label>
        <input v-model="user.password" type="password" id="password" />
      </p>

      <p>
        <label for="age">Votre age (optionnel)</label>
        <input v-model="user.age" type="number" id="age" />
      </p>

      <input id="seConnecter" type="submit" value="Je m'inscris" />
    </form>
    <router-link id="connection" to="/">~ pour se connecter au compte, cliquez ici. ~</router-link>
  </div>
</template>

<script>
import { AJAX_GET_POST } from "../services/ajax";


export default {
  name: "signup",
  props: [],
  mounted() {},
  data() {
    return {
      user: {
        pseudo: "",
        email: "",
        password: "",
        age: null,
      },
    };
  },
  methods: {
    signup(e) {
      e.preventDefault();
      console.log("ok");
      AJAX_GET_POST("http://localhost:3000/api/auth/signup", "POST", this.user)
        .then((response) => {
          console.log("Utilisateur inscrit !", response);
         this.$router.push("/");
        })
        .catch((err) => {
          console.log("Une erreur est survenue !", err);
          console.log(err);
          alert(JSON.parse(err.response).message);
          
        });
    },
  },
  computed: {},
};
</script>

<style scoped>


form {
  display: flex;
  flex-direction: column;
}
form > * {
  font-size: 17px;
  margin-left: 20px;
}
#age {
  background-color: rgb(210, 214, 216);
  margin-left: 8.5%;
}
#pseudo {
  background-color: rgb(210, 214, 216);
  margin-left: 10%;
}
#email {
  background-color: rgb(210, 214, 216);
  margin-left: 10%;
}
#password {
  background-color: rgb(210, 214, 216);
  margin-left: 7%;
}
#seConnecter {
  background-color: rgb(247, 117, 117);
  margin-left: 20px;
  margin-right: 500px;
  margin-bottom: 20px;
}
#connection {
  margin-left: 20px;
  font-size: 20px;
  color: rgb(73, 19, 19);
}
#sous {
  display: flex;  
  height: 100px;
  background-color: rgb(201, 6, 65); 
  
}
#sous img {
  height: 100px;
  padding-left: 10px;
  padding-right: 10px;
  width: 150px;
}
h1 {
  color: black;
  margin-left: 18%;
  }
@media all and (max-width: 653px) {
  #seConnecter {
    margin-right: 65%;
  }
  #password {
      margin-left: 5%;
    }
  h1 {
  color: black;
  margin-left: 5%;
  }
}
@media all and (max-width: 460px) {
h1 {
  text-align: center;
  color: black;
 font-size: 30px;
justify-content: center;
  }

}
   
   
   
   </style>

