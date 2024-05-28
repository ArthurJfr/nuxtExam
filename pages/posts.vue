<template>
    <div>
      <h1>Posts</h1>
   
      <div class="posts-list">
        <h2>Liste des posts</h2>
        <ul>
          <li class="list" v-for="post in posts" :key="post.id">
                        <h5>{{post.title}}</h5>
                        <div>{{post.body}}</div>
            <div class="social">
                <div>❤️  {{post.reactions.likes}}</div>
                <div>👎  {{post.reactions.dislikes}}</div>
                <div>👀  {{post.views}}</div>


            </div>
            
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    middleware: 'auth', // Ajouter le middleware ici
    layout : 'dashboard',
    computed: {
      user() {
        return this.$store.state.user;
      },
      posts() {
        return this.$store.state.posts;
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout');
        this.$router.push('/login');
      }
    },
    async mounted() {
      // Initialiser l'authentification
      this.$store.dispatch('initializeAuth');
      // Rediriger vers la page de login si l'utilisateur n'est pas authentifié
      if (!this.$store.state.authenticated) {
        this.$router.push('/login');
      } else {
        // Fetch current user and users list
        await this.$store.dispatch('fetchCurrentUser');
        await this.$store.dispatch('fetchPosts');
      }
    }
  }
  </script>
  
  <style scoped>
  .user-info {
    width: 550px;
    margin-bottom: 75px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
    background-color: #f3ecec;
    border-radius: 32px;
    -webkit-box-shadow: 5px 6px 20px 5px rgba(0,0,0,0.53); 
    box-shadow: 5px 6px 20px 5px rgba(0,0,0,0.53);
  }

  .social {

display: flex;
flex-direction: row;
gap: 1rem;
  }

  
 
  
  .users-list h2 {
    margin-top: 20px;
  }
  
  .users-list ul {
    list-style: none;
    padding: 0;
  }
  
  .users-list li {
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  </style>
  