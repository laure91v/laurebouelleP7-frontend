//est le fichier “racine” de l’application. permet de creer l'application, d'importer les compposants
//C’est lui qui va faire le lien entre la vue et le modèle -Le point d'entrée JavaScript de votre projet

import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

//créer une nouvelle instance de vue - Utiliser l'application comme modèle pour cette instance de Vue
new Vue({
  router,                 //injecter le routeur avec l'option `router` pour permettre à l'application tout entière d'être à l'écoute du routeur
    render: h => h(App)
}).$mount('#app')




