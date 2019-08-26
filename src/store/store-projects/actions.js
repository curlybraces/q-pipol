import { uid } from "quasar";
import { firebaseAuth, firebaseDb } from "boot/firebase";

export function addProject({ dispatch }, project) {
  let projectId = uid();
  let payload = {
    id: projectId,
    project: project
  };

  dispatch("fbAddProject", payload);
}

export function updateProject({ dispatch }, payload) {
  dispatch("fbUpdateProject", payload);
}

export function deleteProject({ dispatch }, payload) {
  dispatch("fbDeleteProject", payload.id);
}

export function fbReadData({ commit }) {
  let userId = firebaseAuth.currentUser.uid;
  let userProjects = firebaseDb.ref("projects/" + userId);

  // initial check for data
  userProjects.once("value", () => {
    commit("setProjectsDownloaded", true);
  });

  // child added
  userProjects.on("child_added", snapshot => {
    let project = snapshot.val();

    let payload = {
      id: snapshot.key,
      project: project
    };

    commit("addProject", payload);
  });

  // child updated
  userProjects.on("child_changed", snapshot => {
    let project = snapshot.val();

    let payload = {
      id: snapshot.key,
      updates: project
    };

    commit("updateProject", payload);
  });

  // child removed
  userProjects.on("child_removed", snapshot => {
    let projectId = snapshot.key;
    commit("deleteProject", projectId);
  });

}

export function fbAddProject({}, payload) {
  let userId = firebaseAuth.currentUser.uid;
  let projectRef = firebaseDb.ref("projects/" + userId + "/" + payload.id);
  projectRef.set(payload.project);
}

export function fbUpdateProject({}, payload) {
  let userId = firebaseAuth.currentUser.uid;
  let projectRef = firebaseDb.ref("projects/" + userId + "/" + payload.id);
  projectRef.update(payload.updates);
}

export function fbDeleteProject({}, projectId) {
  let userId = firebaseAuth.currentUser.uid;
  let projectRef = firebaseDb.ref("projects/" + userId + "/" + projectId);
  projectRef.remove();
}
