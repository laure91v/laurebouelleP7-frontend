<template>
  <div id="mainMenu">
     <HeaderNav />
     
    <h1>Créer un nouvel article</h1>
    <form @submit="createPost">
      <input placeholder="Titre" v-model="newPost.title" />
      <textarea placeholder="Description" v-model="newPost.text"></textarea>
      <input class="publier" type="submit" value="Publier cet article" />
    </form>
     
  </div>
</template>

<script>
import HeaderNav from '../components/header-nav'

import {AJAX_GET_POST} from '../services/ajax';
export default  {
    name: 'login',
    components:{
    HeaderNav
  },
    props: [],
    mounted() {
      this.storedData = JSON.parse(localStorage.getItem('groupomania_P7'));
    },
    data: () =>  {
      return {
        newPost : {
          title: "",
          text: ""
        },
        storedData: {
          userId: '',
          token: '',
          isAdmin: 0
        }
      }
    },
    methods: {
      createPost(evt) {
        evt.preventDefault();
        if (this.newPost.text.trim().length < 10) {
          alert("votre article doit faire 10 caractères");
          return
        }
        const dataToSend = {...this.newPost, ...this.storedData};
         AJAX_GET_POST('http://localhost:3000/api/post/create/' + dataToSend.userId, 'POST', dataToSend)
        .then(response => {
          console.log('Utilisateur inscrit !', response);
          this.$router.push({ path: 'articles' })
        })
        .catch(err => {
          console.log('Une erreur est survenue !', err);
        });

      }
    },
    computed: {
 
    }
}
</script>

<style scoped>
#mainmenu {
  background-color: rgb(241,239,239);
  height: 1000px;
}
h1 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
textarea, input{
  height: auto;
  width: 800px;
}
input {
  margin-top: 20px;
  margin-bottom: 20px;
 
}
.publier {
   background-color: rgb(25, 15, 172);
  color: white;
  font-style: italic;
  height:20px;
  width: 300px;
}
form textarea {
  padding-top:20px;
  padding-bottom: 100px;
  padding-right: 50px;
  background-color: rgb(228, 227, 227);
}

@media all and (max-width: 892px) {
  textarea, input{
  height: auto;
  width: auto;
}}
@media all and (max-width: 334px) {
.publier {
  margin-top: 20px;
  margin-bottom: 20px;
 width: 150px;
}
}

</style>

