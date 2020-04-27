import { Dark, LocalStorage } from 'quasar';

export const setDense = ({ commit }, payload) => {
  LocalStorage.set('dense', payload);
  commit('SET_DENSE', payload);
};

export const setDark = ({ commit }, payload) => {
  Dark.set(payload);
  LocalStorage.set('dark', payload);
  commit('SET_DARK', payload);
};
