<template>
  <header id="entete">
    <img
      src="../assets/icon-left-font-monochrome-blackv2.png"
      alt="logo gauche"
      title="logo gauche"
    />

    <nav id="liensConnections">
      <router-link id="articles" to="/articles">Les articles<br />disponibles</router-link>
      <router-link id ="nouvelArticle" to="/nouvelarticle"
        >Ecrire<br />un nouvel article</router-link
      >
      <div id="profil">
        <img
          id="imgPersonn"
          src="../assets/iconepersonv3.png"
          alt="logo personnage"
          title="logo personnage"
        />
        <router-link to="/profil">Mon profil</router-link>
      </div>
      <router-link v-if="storedData.isAdmin" to="/moderation"
        >Modération</router-link
      >
      <button @click="logout">> Se déconnecter</button>
    </nav>
  </header>
</template>

<script>
export default {
  name: "header-nav",
  props: [],
  methods: {
    logout() {
      localStorage.removeItem("groupomania_P7");
      this.$router.push({ path: "/" });
    },
  },
  data() {
    return {
      storedData: {},
    };
  },
  mounted() {
    this.storedData = JSON.parse(localStorage.getItem("groupomania_P7"));
    console.log(this.storedData);
  },
};
</script>


<style scoped>
#entete {
  display: flex;
  justify-content: space-around;
  height: 102px;
  background-color: rgb(205, 73, 100);
}

#entete img {
  height: 60px;
  width: 278;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 15px;
}
#imgPersonn {
  width: 20px;
  height: 15px;
  padding-bottom: 5px;
}
#profil {
  border: grey 2px solid;
  display: flex;
  flex-direction: column;
  max-height: 100px;
  align-items: center;
  border-radius: 10%;
}
nav {
  display: flex;
}

nav > * {
  margin: 10px;
  text-align: center;
  font-weight: bold;
  
   background-color: rgb(209, 85, 116);
}

nav div:hover {
  color: rgb(117, 117, 117);
}

nav button {
  display: flex;
  align-items: center;
  margin-left: 60px;
  font-size: 15px;
  
}
#articles {
  display: flex;
  text-align: center;
  font-size: 20px;
  border: grey 2px solid;
  border-radius: 10%;
  
  align-items: center;
}
#nouvelArticle {
   display: flex;
  font-size: 20px;
  border: grey 2px solid;
  border-radius: 10%;
   align-items: center;
}


@media all and (max-width: 624px) {
  nav button {
    display: flex;
    align-items: center;
    margin-right: 5px;
    background-color: rgb(201, 6, 65);
    padding: 5px;
  }
}
nav > * {
  padding: 5px;
  text-align: center;
  font-weight: bold;
}
@media all and (max-width: 621px) {
  #entete img {
    height: 100px;
    padding-left: 1px;
    padding-right: 1px;
    width: 90px;
  }
  nav > * {
    padding: 5px;
    text-align: center;
    font-weight: bold;
    font-size: 12px;
  }
  nav button {
    margin-left: 1px;
    background-color: rgb(201, 6, 65);
    padding: 5px;
  }
}
@media all and (max-width: 444px) {
  nav > * {
    font-size: 10px;
  }
}
</style>

