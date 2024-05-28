<template>
  <div>
    <h1>Utilisateurs</h1>
    <div class="user-info">
      <h4>Bonjour, {{ user.username }} 😇</h4>
      <p class="emailMe">📫 {{ user.email }}</p>
    </div>
    <div class="add-user-form">
      <h2>Ajouter un utilisateur</h2>
      <form class="addform" @submit.prevent="addUser">
        <div>
          <input v-model="newUser.username" type="text" id="username" placeholder="Username" required>
        </div>
        <div>
          <input v-model="newUser.email" type="email" id="email" placeholder="Email" required>
        </div>
        <button type="submit">➕</button>
      </form>
    </div>
    <div class="users-list">
      <h2>Liste des utilisateurs</h2>
      <ul>
        <li class="list" v-for="user in users" :key="user.id">
          <NuxtLink :to="`/users/${user.id}`">
            <div>{{ user.username }} - {{ user.email }}</div>
          </NuxtLink>
          <div @click="removeUser(user.id)" class="remove-user">❌</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth', // Ajouter le middleware ici
  layout : 'dashboard',
  data() {
    return {
      newUser: {
        username: '',
        email: ''
      }
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    users() {
      return this.$store.state.users;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
    async addUser() {
      const userData = {
        firstName: this.newUser.username,
        email: this.newUser.email
      };
      await this.$store.dispatch('addUser', userData);
      this.newUser.username = '';
      this.newUser.email = '';
    },
    async removeUser(userId) {
      await this.$store.dispatch('removeUser', userId);
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
      await this.$store.dispatch('fetchUsers');
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
.list {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.emailMe {
  font-size: 25px;
}

.user-info h2 {
  margin: 0;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.remove-user {
  cursor: pointer;
  color: red;
  font-size: 20px;
}

.add-user-form {
  margin-bottom: 20px;
  width: 100%;
}

.add-user-form form {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.add-user-form div {
  margin-bottom: 10px;
}

.add-user-form label {
  margin-bottom: 5px;
  font-weight: bold;
}

.add-user-form input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.add-user-form button {
  padding: 10px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  outline: none;
}


</style>
