<template>
  <div class="profile">
    <HeaderNav />
    <h1>Mes infos</h1>
    <form @submit="updateUser">
      <p id="pseudoTotal">
        <label for="pseudo">Mon pseudo</label>
        <input v-model="user.pseudo" type="text" id="pseudo" />
      </p>
      <p v-if="errorMessages[0]" class="invalid-field-msg">
        {{ errorMessages[0] }}
      </p>

      <p id="emailTotal">
        <label for="email">Mon adresse mail</label>
        <input v-model="user.email" type="email" id="email" />
      </p>

      <p v-if="errorMessages[1]" class="invalid-field-msg">
        {{ errorMessages[1] }}
      </p>

      <p id="passwordTotal">
        <label for="password">Nouveau mot de passe</label>
        <input
          v-model="user.newPassword"
          type="password"
          id="password"
          placeholder="Laisser vide par défaut"
        />
      </p>
      <p v-if="errorMessages[2]" class="invalid-field-msg">
        {{ errorMessages[2] }}
      </p>

      <div v-if="user.newPassword">
        <label for="password-confirm"
          >Nouveau mot de passe (confirmation)</label
        >
        <input
          v-model="newPasswordConfirm"
          type="password"
          id="password-confirm"
        />
        <p
          v-if="user.newPassword != newPasswordConfirm"
          class="invalid-field-msg"
        >
          Les mots de passe doivent être identiques
        </p>
      </div>

      <p id="ageTotal">
        <label for="age">Mon age (optionnel)</label>
        <input v-model="user.age" type="number" id="age" />
      </p>

      <p v-if="errorMessages[3]" class="invalid-field-msg">
        {{ errorMessages[3] }}
      </p>

      <input
        id="modifier"
        type="submit"
        value="Enregistrer les modifications"
      />
    </form>
    <input
      id="supprimerCompte"
      @click="deleteAccount"
      type="button"
      value="Supprimer votre compte"
    />

    <form v-if="displayConfirmDeleteForm" @submit="confirmDeleteAcount">
      <p>
        <label for="email-delete-confirm">Confirmer votre email</label>
        <input
          v-model="emailDeleteConfirm"
          type="email"
          id="email-delete-confirm"
        />
      </p>
      <input type="submit" value="Supprimer définitivement ?" />
    </form>
    <Popup
      v-if="displayPopup"
      :msg="popupMsg"
      v-on:close="displayPopup = false"
    />
  </div>
</template>

<script>
import { VALIDATE_EMAIL } from "../services/utilities";
import { AJAX_GET_POST } from "../services/ajax";
import HeaderNav from "../components/header-nav";
import Popup from "../components/popup";

export default {
  components: {
    HeaderNav,
    Popup,
  },
  name: "profil",
  props: [],
  data() {
    return {
      user: {
        age: null,
        pseudo: "",
        email: "",
        newPassword: "",
      },
      newPasswordConfirm: "",
      storedData: {},
      errorMessages: [],
      popupMsg:
        "Veuillez confirmer la suppression de votre compte en saisissant votre adresse mail",
      displayPopup: false,
      displayConfirmDeleteForm: false,
      emailDeleteConfirm: "",
    };
  },
  mounted() {
    this.storedData = JSON.parse(localStorage.getItem("groupomania_P7"));
    this.loadUser();
  },
  methods: {
    loadUser() {
      AJAX_GET_POST(
        "http://localhost:3000/api/auth/readOne/" + this.storedData.userId,
        "GET",
        null
      )
        .then((user) => {
          console.log("Utilisateur récupéré !", user);
          this.user = user;
          this.user.password = "";
        })
        .catch((err) => {
          console.log("Une erreur est survenue !", err);
        });
    },

    checkFormFields() {
      this.errorMessages = ["", "", "", ""];
      let errors = 0;
      if (this.user.pseudo.trim().length < 2) {
        this.errorMessages[0] =
          "Le nouveau pseudo doit impérativement avoir une longueur minimum de 2 caractères";
        errors++;
      }
      if (!VALIDATE_EMAIL(this.user.email)) {
        this.errorMessages[1] =
          "Le nouveau mail doit être correctement formaté";
        errors++;
      }

      if (this.user.newPassword) {
        if (this.user.newPassword.trim().length < 8) {
          this.errorMessages[2] =
            "Le nouveau mot de passe doit impérativement avoir une longueur minimum de 8 caractères";
          errors++;
        }
        if (this.user.newPassword != this.newPasswordConfirm) {
          errors++;
        }
      }

      if (!(this.user.age < 120)) {
        this.errorMessages[3] = "L'age saisi n'est pas valide !";
        errors++;
      }

      if (errors > 0) {
        setTimeout(() => {
          this.errorMessages = ["", "", "", ""];
        }, 5000);
        return false;
      } else {
        return true;
      }
    },

    updateUser(e) {
      e.preventDefault();

      if (!this.checkFormFields()) {
        return;
      }

      AJAX_GET_POST(
        "http://localhost:3000/api/auth/update/" + this.storedData.userId,
        "PUT",
        this.user
      )
        .then((success) => {
          console.log(success);
          alert("modifications prises en compte");
          this.$router.push({ path: "articles" });
        })
        .catch((err) => {
          console.log("Une erreur est survenue !", err);
          alert("Modifier pseudo ou email car déjà existant");
          
        });
    },

    deleteAccount() {
      this.displayPopup = true;
      this.displayConfirmDeleteForm = true;
    },

    confirmDeleteAcount(e) {
      e.preventDefault();
      if (this.user.email === this.emailDeleteConfirm) {
        AJAX_GET_POST(
          "http://localhost:3000/api/auth/delete/" + this.storedData.userId,
          "DELETE",
          null
        )
          .then((success) => {
            console.log(success);
            localStorage.removeItem("groupomania_P7");
            this.$router.push({ path: "/" });
          })
          .catch((err) => {
            console.log("Une erreur est survenue !", err);
          });
      }
    },
  },
  computed: {},
};
</script>

<style scoped>
.invalid-field-msg {
  color: red;
  font-style: italic;
}

#age {
  background-color: rgb(210, 214, 216);
  margin-left: 50px;
}
#ageTotal {
  margin-left: 20px;
}

#pseudo {
  background-color: rgb(210, 214, 216);
  margin-left: 103px;
}
#pseudoTotal {
  margin-left: 20px;
}
#email {
  background-color: rgb(210, 214, 216);
  margin-left: 70px;
}
#emailTotal {
  margin-left: 20px;
}
#password {
  background-color: rgb(210, 214, 216);
  margin-left: 40px;
}
#passwordTotal {
  margin-left: 20px;
}
#modifier {
  margin-left: 20px;
  margin-top: 20px;
  background-color: rgb(247, 117, 117);
  font-style: italic;
}
#supprimerCompte {
  margin-left: 20px;
  margin-top: 20px;
  background-color: rgb(247, 117, 117);
  font-style: italic;
}
</style>
