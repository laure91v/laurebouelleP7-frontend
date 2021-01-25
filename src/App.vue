<!--fichier principal qui englobe tous les composants de l’application.<template>
  point d'entrée de vos vue - On y retrouve trois sections -->
  
<template>
 <div id="app">
    <router-view/>      <!--Il fait le rendu des composants qui concordent avec une route de premier niveau-->
  </div>                <!--pour qu'App.vue appelle un composant selon le routing, on passe par le composant router-view-->
</template>


<script>
export default {

}
</script>


<style></style>

