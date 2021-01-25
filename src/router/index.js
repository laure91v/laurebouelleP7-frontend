//la liste des chemins d’accès et des composants à afficher lorsque ce chemin est accédé
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Signup from '../views/signup.vue'
import Posts from '../views/posts.vue'
import Profil from '../views/profil.vue'
import NewPost from '../views/post-create.vue'
import PostDetails from '../views/post-details.vue'
import Moderation from '../views/moderation.vue'


Vue.use(VueRouter)
//mapper des itinéraires avec le modèle donné au même composant

//bruno
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/inscription',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil
  },
  {
    path: '/articles',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/article/:id',
    name: 'PostDetails',
    component: PostDetails
  },
  {
    path: '/nouvelarticle',
    name: 'NouvelArticle',
    component: NewPost
  },
  {
    path: '/moderation',
    name: 'Moderation',
    component: Moderation
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
