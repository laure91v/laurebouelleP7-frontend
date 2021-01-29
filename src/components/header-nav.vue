<template>
  <header id="entete">
    <img
      src="../assets/icon-left-font-monochrome-blackv2.png"
      alt="logo gauche"
      title="logo gauche"
    />

    <nav id="liensConnections">
      <svg id="burger-menu" viewBox="0 0 100 80" width="25" height="25">
        <rect y="2" width="100" height="6"></rect>
        <rect y="35" width="100" height="6"></rect>
        <rect y="68" width="100" height="6"></rect>
      </svg>
      <input type="checkbox" id="burger-menu-checkbox" />
      <ul>
        <li>
          <router-link id="articles" to="/articles">Les articles</router-link>
        </li>
        <li>
          <router-link id="nouvelArticle" to="/nouvelarticle"
            >Nouvel article</router-link
          >
        </li>
        <li>
          <div id="profil">
            <img
              id="imgPersonn"
              src="../assets/iconepersonv2.png"
              alt="logo personnage"
              title="logo personnage"
            />
            <router-link id="mon-profil" to="/profil">Mon profil</router-link>
          </div>
        </li>
        <li v-if="storedData.isAdmin">
          <router-link to="/moderation">Modération</router-link>
        </li>
        <li>
          <button @click="logout">> Se déconnecter</button>
        </li>
      </ul>
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
  width: 100vw;
  background-color: rgb(205, 73, 100);
  box-shadow: 0 2px 4px silver;
  position: relative;
}

#entete > img {
  height: 60px;
  width: 278;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 15px;
}

#imgPersonn {
  height: 21px;
  margin-right: 10px;
}

#profil {
  display: flex;
  align-items: center;
  border-radius: 10%;
}

#burger-menu-checkbox {
  position: absolute;
  top: 7px;
  right: 7px;
  width: 40px;
  height: 40px;
  z-index: 2;
  opacity: 0;
  cursor: pointer;
  visibility: hidden;
}

#burger-menu {
  border: 1px solid;
  border-radius: 7px;
  padding: 5px;
  position: absolute;
  top: 10px;
  right: 10px;
  visibility: hidden;
}

nav > ul {
  display: flex;
  list-style-type: none;
  padding-left: 0;
}

nav li {
  margin: 10px;
  text-align: center;
  font-weight: bold;
  height: 30px;

}

nav div:hover {
  color: rgb(117, 117, 117);
}

nav button {
  display: flex;
  align-items: center;
  font-size: 15px;
  background-color: black;
  color: white;
  border: 0 transparent;
  padding: 4px 10px;
  border-radius: 4px;
  box-shadow: 1px 1px 6px grey;
}
#articles, #nouvelArticle, #mon-profil {
  text-align: center;
  font-size: 20px;
}

@media all and (max-width: 840px) {
  #entete {
    justify-content: space-between;
  }

  #burger-menu-checkbox, #burger-menu {
    visibility: visible;
  }

  nav > ul {
        flex-direction: column;
        background-color: rgb(205, 73, 100);;
        padding: 5px;
        width: 230px;
        top: 85px;
        position: absolute;
        right: 0;
        z-index: 2;
        transform: scale(0);
  }

  #burger-menu-checkbox:checked + ul {
    box-shadow: -3px 5px 4px silver; 
    border-bottom-left-radius: 4px;
    transition: all 0.2s linear;
    transform: scale(1);
  }

  nav li {
    border-bottom: 1px solid;
  }

  nav li:last-child {
    border-bottom: 0 transparent;
  }

  nav button {
    margin-left: 0;
  }
}

@media all and (max-width: 624px) {
  nav button {
    display: flex;
    align-items: center;
    margin-right: 5px;
    padding: 5px;
  }
}
nav > * {
  padding: 5px;
  text-align: center;
  font-weight: bold;
}
@media all and (max-width: 621px) {
  #entete > img {
    height: 50px;
    padding-left: 1px;
    padding-right: 1px;
  }

  
  nav li {
    padding: 5px;
    text-align: center;
    font-weight: bold;
    font-size: 12px;
    display: flex;
    justify-content: center;
  }
  nav button {
    margin-left: 1px;
    padding: 5px;
  }
}

</style>

