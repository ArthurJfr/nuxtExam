import axios from 'axios';

export const state = () => ({
  authenticated: false,
  user: null,
  token: null,
  users: [],
  posts : [],
});

export const mutations = {
  setAuth(state, { auth, user, token }) {
    state.authenticated = auth;
    state.user = user;
    state.token = token;
  },
  clearAuth(state) {
    state.authenticated = false;
    state.user = null;
    state.token = null;
    state.users = [];
  },
  setUsers(state, users) {
    state.users = users;
  },
  setUser(state, user) {
    state.user = user;
  },
  removeUser(state, userId) {
    state.users = state.users.filter(user => user.id !== userId);
  },
  addUser(state, user) {
    state.users.push(user);
  },
  setPosts(state, posts){
    state.posts = posts;
  }
};

export const actions = {
  async login({ commit }, { username, password }) {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
        expiresInMins: 250 // optionnel, par défaut 60
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log(response.data)
      const user = response.data;
      localStorage.setItem('auth', JSON.stringify({ auth: true, user }));

      commit('setAuth', { auth: true, user, token });

    } catch (error) {
      console.error('Erreur de login:', error);
    }
  },
  
  logout({ commit }) {
    localStorage.removeItem('token');
    localStorage.removeItem('auth');
    commit('clearAuth');
  },

  initializeAuth({ commit }) {
    const auth = JSON.parse(localStorage.getItem('auth'));
    const token = localStorage.getItem('token');
    if (auth && auth.auth && token) {
      commit('setAuth', { auth: true, user: auth.user, token });
    }
  },


    async fetchCurrentUser({ commit, state }) {
    try {
      const response = await axios.get('https://dummyjson.com/user/me', {
        headers: {
          'Authorization': `Bearer ${state.token}`
        }
      });

      commit('setUser', response.data);

    } catch (error) {
      console.error('Erreur de récupération de l\'utilisateur:', error);
    }
  },

  async fetchUsers({ commit }) {
    try {
      const response = await axios.get('https://dummyjson.com/users');
        console.log(response.data);
      commit('setUsers', response.data.users);

    } catch (error) {
      console.error(error + ' erreur fetching users')
    }
  },

  async fetchPosts({ commit }) {
    try {
      const response = await axios.get('https://dummyjson.com/posts');
        console.log(response.data);
      commit('setPosts', response.data.posts);

    } catch (error) {
      console.error(error + ' erreur fetching users')
    }
  },
  async addUser({ commit, state }, userData) {
    try {
      const response = await axios.post('https://dummyjson.com/users/add', JSON.stringify(userData), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.token}`
        }
      });
console.log(response.data);
      commit('addUser', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
    }
  },
  async removeUser({ commit, state }, userId) {
    try {
      await axios.delete(`https://dummyjson.com/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${state.token}`
        }
      });

      commit('removeUser', userId);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    }
  },
  async updateUser({ commit, state }, { userId, updatedData }) {
    try {
      const response = await axios.put(`https://dummyjson.com/users/${userId}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.token}`
        }
      });

      commit('updateUser', response.data);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    }
  }
  
};
