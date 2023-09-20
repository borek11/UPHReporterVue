import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      connectionString: 'https://localhost:5001/api/',
      isUser: false, // Rola: User
      isAdmin: false, // Rola: Admin
    };
  },
  mutations: {
    SET_IS_USER(state, value) { // Definiuj mutację do zmiany isUser
      state.isUser = value;
    },
    SET_IS_ADMIN(state, value) { // Definiuj mutację do zmiany isAdmin
      state.isAdmin = value;
    },
  },
});