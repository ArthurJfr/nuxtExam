<template>
    <div>
        

      <h1>Détails de l'utilisateur</h1>
      <div v-if="user">
        <p>Nom: {{ user.firstName }} {{ user.lastName }}</p>
        <p>Nom d'utilisateur: {{ user.username }}</p>
        <p>Email: {{ user.email }}</p>
        <p>Âge: {{ user.age }}</p>
        <p>Téléphone: {{ user.phone }}</p>
  
        <h2>Modifier l'utilisateur</h2>
        <form @submit.prevent="updateUser">
          <div>
            <label for="firstName">Prénom:</label>
            <input v-model="form.firstName" type="text" id="firstName">
          </div>
          <div>
            <label for="lastName">Nom:</label>
            <input v-model="form.lastName" type="text" id="lastName">
          </div>
          <div>
            <label for="username">Nom d'utilisateur:</label>
            <input v-model="form.username" type="text" id="username">
          </div>
          <div>
            <label for="email">Email:</label>
            <input v-model="form.email" type="email" id="email">
          </div>
          <div>
            <label for="age">Âge:</label>
            <input v-model="form.age" type="number" id="age">
          </div>
          <div>
            <label for="phone">Téléphone:</label>
            <input v-model="form.phone" type="text" id="phone">
          </div>
          <button type="submit">Mettre à jour</button>
        </form>
      </div>
      <div v-else>
        <p>Chargement...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    layout : 'dashboard',
    data() {
      return {
        user: null,
        form: {
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          age: '',
          phone: ''
        }
      };
    },
    async fetch() {
      const userId = this.$route.params.id;
      try {
        const response = await fetch(`https://dummyjson.com/users/${userId}`);
        const data = await response.json();
        this.user = data;
        this.form = { ...data };
      } catch (error) {
        console.error('Erreur de récupération des détails de l\'utilisateur:', error);
      }
    },
    methods: {
      async updateUser() {
        const userId = this.$route.params.id;
        await this.$store.dispatch('updateUser', { userId, updatedData: this.form });
        this.$router.push('/users');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Ajoutez des styles pour la page de détails de l'utilisateur */
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  form div {
    margin-bottom: 10px;
  }
  
  form label {
    display: block;
    margin-bottom: 5px;
  }
  
  form input {
    width: 500px;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  form button {
    width: 250px;
    padding: 10px 20px;
    border: none;
    background-color: #28a745;
    color: white;
    cursor: pointer;
    border-radius: 4px;
  }
  
  form button:hover {
    background-color: #218838;
  }
  </style>
  