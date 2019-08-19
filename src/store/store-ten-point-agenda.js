import { axiosInstance } from "boot/axios";

const state = {
  ten_point_agenda: [] //  localStorage.getItem("ten_point_agenda") || []
};

const mutations = {
  setTenPointAgenda(state, value) {
    state.ten_point_agenda = value;
  }
};

const actions = {
  loadTenPointAgenda({ commit }) {
    axiosInstance
      .get("/ten_point_agenda")
      .then(res => {
        localStorage.setItem("ten_point_agenda", JSON.stringify(res.data));
        commit("setTenPointAgenda", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  }
};

const getters = {
  //
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
