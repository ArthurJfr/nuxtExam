<template>
    <div class="login-container">
      <h1>Connexion</h1>
      <form @submit.prevent="login">
        <div>
          <label for="username">Nom d'utilisateur:</label>
          <input v-model="username" type="text" id="username" required>
        </div>
        <div>
          <label for="password">Mot de passe:</label>
          <input v-model="password" type="password" id="password" required>
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      async login() {
        try {
          await this.$store.dispatch('login', {
            username: this.username,
            password: this.password
          });
          // Rediriger vers le dashboard après une connexion réussie
          this.$router.push('/');
        } catch (error) {
          console.error('Erreur de login:', error);
        }
      }
    }
  }
  </script>
  
  <style>
  /* Ajoutez des styles pour votre page de connexion */
  .login-container {
    max-width: 300px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  </style>
  