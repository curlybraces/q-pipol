import { Dark } from 'quasar';

export const setDense = ({ commit }, payload) => {
  commit('SET_DENSE', payload);
};

export const setDark = ({ commit }, payload) => {
  Dark.set(payload);
  commit('SET_DARK', payload);
};
