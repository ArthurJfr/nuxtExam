<template>
    <div class="dashboard-container">
      <aside class="sidebar">
        <h2>Hello, {{ user.username }}</h2>
        <nav>
          <ul>
            <li>
              <NuxtLink to="/">Utilisateurs</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products">Produits</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/posts">Posts</NuxtLink>
            </li>
          </ul>
        </nav>
        <button @click="logout">Se déconnecter</button>
      </aside>
      <main class="main-content">
        <nuxt />
      </main>
    </div>
  </template>
  
  <script>
  export default {
    middleware : 'auth',
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout');
        this.$router.push('/login');
      }
    },
    mounted() {
      // Initialiser l'authentification
      this.$store.dispatch('initializeAuth');
      // Rediriger vers la page de login si l'utilisateur n'est pas authentifié
      if (!this.$store.state.authenticated) {
        this.$router.push('/login');
      }
    }
  }
  </script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
  }
  
  .sidebar {
    width: 250px;
    height: 100vh;
    background-color: #2c3e50;
    color: white;
    padding: 20px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .sidebar h2 {
    margin: 0;
    margin-bottom: 20px;
  }
  
  .sidebar nav ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .sidebar nav ul li {
    margin: 10px 0;
    list-style-type: none;
  }
  
  .sidebar nav ul li a {
    color: white;
    text-decoration: none;
    font-size: 18px;
  }
  
  .sidebar nav ul li a:hover {
    color: #cbc0c0;
  }
  
  .sidebar button {
    padding: 10px 20px;
    border: none;
    background-color: #e74c3c;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
  }
  
  .sidebar button:hover {
    background-color: #c0392b;
  }
  
  .main-content {
    margin-left: 250px;
    padding: 20px;
    box-sizing: border-box;
    width: calc(100% - 250px);
  }
  </style>
  