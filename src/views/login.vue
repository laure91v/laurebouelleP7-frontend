<template>
  <div>
    <div id="sous">
      <img
        src="../assets/icon-left-font-monochrome-blackv2.png"
        alt="logo gauche"
        title="logo gauche"
      />
      <h1>PAGE DE CONNECTION</h1>
    </div>
    <div id="deuxParties">
      <div id="troisPartiesGauche">
        <span> Connectez-vous</span>
        <p>et venez lire les nouveaux articles</p>
        <form @submit="login" id="deuxInputs">
          <input id="pseudo" placeholder="votre pseudo" v-model="user.pseudo" />
          <input
            id="password"
            placeholder="votre mot de passe"
            v-model="user.password"
            type="password"
          />
          <input id="connection" type="submit" value="se connecter" />
        </form>
      </div>
      <div id="PartieVersInscription">
        <span> Pas encore client? </span>
        <p>n'hésitez plus et venez rédiger vos articles sur notre site</p>
        <router-link id="inscription" to="/inscription">
          > Créer votre compte</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { AJAX_GET_POST } from "../services/ajax";
export default {
  name: "login",
  props: [],
  mounted() {},
  data: () => {
    return {
      user: {
        pseudo: "",
        password: "",
      },
    };
  },
  methods: {
    login(evt) {
      evt.preventDefault();
      AJAX_GET_POST("http://localhost:3000/api/auth/login", "POST", this.user)
        .then((userData) => {
          console.log("Utilisateur inscrit !", userData);
          localStorage.setItem("groupomania_P7", JSON.stringify(userData));

          this.$router.push({ path: "articles" });
        })
        .catch((err) => {
          alert(JSON.parse(err.response).message);
        });
    },
  },
  computed: {},
};
</script>

<style scoped>
#pseudo {
  margin-top: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: rgb(240, 238, 238);
  width: 400px;
}
#password {
  margin-top: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: rgb(240, 238, 238);
  width: 400px;
}

#connection {
  background-color: rgb(205, 73, 100);
  width: 150px;
  margin-top: 10px;
  font-size: 17px;
  margin-bottom: 20px;
}

#sous {
  display: flex;
  height: 102px;
  background-color: rgb(205, 73, 100);
}
#sous img {
  height: 60px;
  padding-left: 10px;
  padding-right: 10px;
  width: 278px;
  padding-top: 15px;
}
h1 {
  color: black;
  margin-left: 100px;
  margin-top: 30px;
}
/* span,p  et cliquer inscription*/
#PartieVersInscription {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  background-color: rgb(219, 221, 223);
  margin-left: 10px;
  width: 300px;
  height: 300px;
  padding-top: 10px;
}
/*pas encore client*/
#PartieVersInscription span {
  font-size: 25px;
  color: black;
  font-weight: bold;
}
#PartieVersInscription p {
  padding: 20px;
  text-align: center;
}
/*cliquer lien vers client*/
#inscription {
  border-radius: 5px;
  font-size: 20px;
  background-color: rgb(25, 15, 172);
  color: white;
  margin-top: 50px;
  padding: 5px;
}
/* deuxinputs + vers inscription*/
#deuxParties {
  display: flex;
  justify-content: space-around;
}
#deuxInputs {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
}

#troisPartiesGauche {
  display: flex;
  flex-direction: column;
  box-shadow: 10px 5px 5px grey;
  border: grey 1px solid;
  margin-left: 20px;
  width: 500px;
  margin-top: 20px;
}
#troisPartiesGauche span {
  font-size: 25px;
  text-align: center;
  font-weight: bold;
}
#troisPartiesGauche p {
  font-size: 20px;
  text-align: center;
  font-weight: bold;
}

@media all and (max-width: 836px) {
  #deuxParties {
    display: flex;
    flex-direction: column;
  }
  h1 {
    font-size: 25px;
    margin-left: 50px;
  }
}
@media all and (max-width: 554px) {
  h1 {
    margin-left: 20px;
    font-size: 15px;
  }
  #sous img {
    height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    width: 185px;
    padding-top: 15px;
  }
  #troisPartiesGauche {
    display: flex;
    flex-direction: column;
    box-shadow: 10px 5px 5px grey;
    border: grey 1px solid;
    margin-left: 20px;
    width: 300px;
    margin-top: 20px;
  }
  #pseudo {
    margin-top: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: rgb(240, 238, 238);
    width: 200px;
  }
  #password {
    margin-top: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: rgb(240, 238, 238);
    width: 200px;
  }
}
@media all and (max-width: 541px) {
  h1 {
    margin-left: 10px;
    font-size: 12px;
  }
  #troisPartiesGauche {
    display: flex;
    flex-direction: column;
    box-shadow: 10px 5px 5px grey;
    border: grey 1px solid;
    margin-left: 8px;
    width: 280px;
    margin-top: 20px;
  }
  #PartieVersInscription {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  background-color: rgb(219, 221, 223);
  margin-left: 10px;
  width: 250px;
  height: 300px;
  padding-top: 10px;
}
}
</style>

