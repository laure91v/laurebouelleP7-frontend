<template>
  <header id="entete">
    <img
      src="../assets/icon-left-font-monochrome-black.png"
      alt="logo gauche"
      title="logo gauche"/>

    <nav id="liensConnections">
      <router-link to="/articles">Les articles<br />disponibles</router-link>
      <router-link to="/nouvelarticle"
        >Ecrire<br />un nouvel article</router-link>

      <router-link to="/profil">Mon profil</router-link>
      <router-link v-if="storedData.isAdmin" to="/moderation">Modération</router-link>
      <button @click="logout">Déconnexion></button>
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
  height: 100px;
  background-color: rgb(201, 6, 65);
}

#entete img {
  height: 100px;
  padding-left: 10px;
  padding-right: 10px;
  width: 150px;
}

nav {
  display: flex;
  align-items: center;
}

nav > * {
  padding: 15px;
  text-align: center;
  font-weight: bold;
}

nav div:hover {
  color: rgb(117, 117, 117);
}

nav button {
  display: flex;
  align-items: center;
  margin-left: 50px;
  background-color: rgb(201, 6, 65);
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

