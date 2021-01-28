<template>
  <div id="signup-main">
    <div id="sous">
      <img
        src="../assets/icon-left-font-monochrome-blackv2.png"
        alt="logo gauche"
        title="logo gauche"
      />
      
      <h1>PAGE D'INSCRIPTION</h1>
    </div>
    <div id="touteLaPartie">
      <span>
        Créer son compte facilement <br />
        En une seule étape
      </span>
      <p>Informations personnelles</p>
      <form @submit="signup">
        <p>
          <label for="pseudo">Choisir un pseudo :</label><br/>
          <input v-model="user.pseudo" type="text" id="pseudo" />
        </p>

        <p>
          <label for="email">Votre adresse mail :</label><br/>
          <input v-model="user.email" type="email" id="email" />
        </p>

        <p>
          <label for="password">Choisir un mot de passe :</label><br/>
          <input v-model="user.password" type="password" id="password" />
        </p>

        <p>
          <label for="age">Votre age (optionnel) :</label><br/>
          <input v-model="user.age" type="number" id="age" />
        </p>

        <input id="seConnecter" type="submit" value="Créer un compte" />
      </form>
      <router-link id="connection" to="/"> > Connection au compte</router-link>
    </div>
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
  text-align: center;
}
label {
  font-size: 18px;
}
#age {
  background-color: rgb(210, 214, 216);
 width: 300px;
 height: 30px;
 border-radius: 10%;
 border: 1px grey solid;
 
}
#pseudo {
  background-color: rgb(210, 214, 216);
 width: 300px;
 height: 30px;
 border-radius: 10%;
 border: 1px grey solid;
}
#email {
  background-color: rgb(210, 214, 216);
  width: 300px;
 height: 30px;
 border-radius: 10%;
 border: 1px grey solid;
}
#password {
  background-color: rgb(210, 214, 216);
  width: 300px;
 height: 30px;
 border-radius: 10%;
 border: 1px grey solid;
}
#seConnecter {
  background-color: rgb(205,73,100);
  width: 250px;
  font-size: 17px;
  text-align: center;
  margin-left: 30%;
  margin-top: 50px;
  height: 50px;
}
#connection {
  text-align: center;
  font-size: 25px;
  background-color: rgb(25, 15, 172);
  padding: 5px;
  border-radius: 5px;
  color: white;
  margin-top: 60px;
  width: 150px;
  margin-left:5px;
  margin-bottom: 5px;
}
#sous {
  display: flex;
  height: 102px;
  background-color: rgb(205,73,100);

}
#sous img {
  height: 60px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 15px;
  width: 278px;
}
h1 {
  color: black;
  margin-left: 100px;
  margin-top: 30px;
  
  }

#touteLaPartie {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
  margin-left: 250px;
  margin-right:250px;
  box-shadow: 10px 5px 5px grey;
  border:grey 1px solid;
  
  
}
#touteLaPartie span {
  text-align: center;
  font-size: 25px;
  margin-top: 50px;
  font-weight: bold;
}
#touteLaPartie p {
  text-align: center;
  font-size: 25px;
  margin-top: 20px;
}

@media all and (max-width: 896px) {
#seConnecter {
width: 150px;
  font-size: 17px;
  text-align: center;
  margin-left: 100px;
}
}
@media all and (max-width: 845px) {
 
#touteLaPartie {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
  margin-left: 10px;
  margin-right:250px;
  box-shadow: 10px 5px 5px grey;
  border:grey 1px solid;
  width:400px;
   
}
h1 {
  color: black;
  margin-left: 30px;
  margin-top: 30px;
  font-size: 25px;;
  }
}
@media all and (max-width: 560px) {
h1 {
  color: black;
  margin-left: 10px;
  margin-top: 30px;
  font-size: 25px;;
  }
#sous img {
 
  height: 40px;
  padding-left: 10px;
  padding-right: 5px;
  width: 185px;
  padding-top: 15px;

}
}
@media all and (max-width: 443px) {
#age {
  background-color: rgb(210, 214, 216);
 width: 200px;
 height: 30px;
 border-radius: 10%;
 border: 1px grey solid;
 
}
#pseudo {
  background-color: rgb(210, 214, 216);
 width: 200px;
 height: 30px;
 border-radius: 10%;
 border: 1px grey solid;
}
#email {
  background-color: rgb(210, 214, 216);
  width: 200px;
 height: 30px;
 border-radius: 10%;
 border: 1px grey solid;
}
#password {
  background-color: rgb(210, 214, 216);
  width: 200px;
 height: 30px;
 border-radius: 10%;
 border: 1px grey solid;
}
#touteLaPartie {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
  margin-left: 10px;
  margin-right:250px;
  box-shadow: 10px 5px 5px grey;
  border:grey 1px solid;
  width:250px;
   
}
h1 {
  color: black;
  margin-left: 5px;
  margin-top: 30px;
  font-size: 15px;;
  }
  #seConnecter {
width: 150px;
  font-size: 17px;
  text-align: center;
  margin-left: 50px;
}
}
@media all and (max-width: 355px) {
h1 {
  color: black;
  margin-left: 0;
  margin-top: 30px;
  font-size: 12px;;
  }
}
</style>

