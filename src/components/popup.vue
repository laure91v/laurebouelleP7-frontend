<template>
  <div class="popup-ctnr">
    <p>{{ msg }}</p>
    <input @click='closePopup' class='ok-btn' type="button" value="Ok">
  </div>
</template>

<script>
export default {
  name: "Popup",
  props: ["msg"],  //!--attributs personnalisables que vous pouvez enregistrer dans un composant-->
  data() {          // ex:passer un titre - des valeurs par défaut-les props sont les propriétés paramétrées et gérées de l'extérieur du composant
    return {};      //Les datas sont les données internes au composant
  },
  mounted() {
   
  },

  methods: {      //recalculées à chaque appel de render- computed: sont réévaluées que lorsque une de leur dépendance est modifiée
      closePopup() {
          this.$emit('close');
      }
  },
};
</script>


<style scoped>
    .popup-ctnr {
        position: fixed;
        background-color: white;
        border-radius: 6px;
        width: 300px;
        padding: 20px;
        top: 30vh;
        left: calc(50% - 150px);
        box-shadow: 1px 1px 6px silver;
    }

    .ok-btn {
        background-color:  rgb(247, 117, 117);
        color: white;
        display: block;
        margin: 20px auto;
        width: 90%;
        border: none;
        border-radius: 4px;
        height: 30px;
    }
</style>
