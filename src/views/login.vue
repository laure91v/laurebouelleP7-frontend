<template>
  <div>
    <div id="sous">
      <img
      src="../assets/icon-left-font-monochrome-black.png"
      alt="logo gauche"
      title="logo gauche"/>
    <h1>page d'accueil-connection</h1>
    </div>
    <form @submit="login">
      <input id="pseudo" placeholder="votre pseudo" v-model="user.pseudo" />
      <input id="password" placeholder="votre mot de passe" v-model="user.password" />
      <input id="connection" type="submit" value="se connecter" />
    </form>
    <router-link id= "inscription" to="/inscription">~ pour créer un compte, cliquez ici. ~</router-link>
  </div>
</template>

<script>
import {AJAX_GET_POST} from '../services/ajax';
export default  {
    name: 'login',
    props: [],
    mounted() {
 
    },
    data: () =>  {
      return {
        user : {
          pseudo:"",
          password:"",

        },
      }
    },
    methods: {
      login(evt) {
        evt.preventDefault();
         AJAX_GET_POST('http://localhost:3000/api/auth/login', 'POST', this.user)
        .then(userData => {
          console.log('Utilisateur inscrit !', userData);
          localStorage.setItem('groupomania_P7', JSON.stringify(userData));

          this.$router.push({ path: 'articles' });
        })
        .catch(err => {
          
          alert(JSON.parse(err.response).message);
        });

      }
    },
    computed: {
 
    }
}
</script>

<style scoped>
#pseudo {
  margin-top: 10px;
  padding-top: 5px;
  padding-bottom:5px;
  margin-right: 60%;
background-color: rgb(240, 238, 238);
}
#password {
  margin-top: 10px;
  padding-top: 5px;
  padding-bottom:5px;
  margin-right: 60%;
  background-color:rgb(240, 238, 238);
}
form {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

#connection {
  background-color: rgb(247, 117, 117);
  margin-right: 80%;
  margin-top: 10px;
  font-size: 17px;
  margin-bottom: 20px;

}
#inscription {
  margin-left: 20px;
  margin-top: 50px;
    font-size: 20px;
  color:  rgb(73, 19, 19);
}
#sous {
  display: flex;
  
  height: 100px;
  background-color: rgb(201, 6, 65);
  text-align: center
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
@media all and (max-width: 590px) {
#pseudo { 
  margin-right: 50%;
}
#password {
   margin-right: 50%;
  }
#connection {  
  margin-right: 70%;
}

}
@media all and (max-width: 472px) {
  h1 {
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

