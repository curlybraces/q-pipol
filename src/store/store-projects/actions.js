import { Notify } from "quasar";

export function addProject({ dispatch }, project) {
  if (!project.title) {
    Notify.create({
      message: "Please enter program/project title.",
      color: "red"
    });
  } else {
    dispatch("fbAddProject", project);
  }
}

export function updateProject({ dispatch }, payload) {
  dispatch("fbUpdateProject", payload);
}

export function deleteProject({ dispatch }, id) {
  dispatch("fbDeleteProject", id);
}

export function updateProjectStatus({ dispatch }, payload) {
  dispatch("fbUpdateProjectStatus", payload);
}

export function fbReadData({}) {}

export function fbAddProject({}, payload) {
  console.log(payload);
}

export function setSearch({ commit }, value) {
  commit("setSearch", value);
}
