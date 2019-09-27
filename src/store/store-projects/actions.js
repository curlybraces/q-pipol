import { Notify } from "quasar";
import { firebaseAuth, projectRef } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";

export function addProject({ dispatch }, project) {
  dispatch("fbAddProject", project);
}

export function updateProject({ dispatch }, payload) {
  dispatch("fbUpdateProject", payload);
}

export function deleteProject({ dispatch }, id) {
  dispatch("fbDeleteProject", id);
}

export function fbReadData({ commit }) {
  projectRef.onSnapshot(snapshot => {
    commit("setProjectsDownloaded", true);
    snapshot.docChanges().forEach(change => {
      if (change.type == "added") {
        let project = change.doc.data();
        project.id = change.doc.id;
        commit("addProject", project);
      } else if (change.type == "removed") {
        commit("deleteProject", change.doc.id);
      } else if (change.type == "modified") {
        let project = change.doc.data();
        project.id = change.doc.id;
        commit("updateProject", project);
      }
    });
  });
}

export function fbAddProject({ }, payload) {
  let userId = firebaseAuth.currentUser.uid;

  let project = payload;
  project.addedBy = userId;

  projectRef
    .doc()
    .set(project)
    .then(() => {
      Notify.create("Project Added");
      this.$router.push("/");
    })
    .catch(err => {
      showErrorMessage(err.message);
    });
}

export function fbUpdateProject({ }, payload) {
  let userId = firebaseAuth.currentUser.uid;
  payload.updatedBy = userId;
  let projectRef = projectRef.doc(payload.id);
  projectRef
    .update(payload)
    .then(() => {
      Notify.create("Project updated.");
    })
    .catch(err => {
      Notify.create(err.message);
    });
}

export function fbDeleteProject({ commit }, projectId) {
  projectRef
    .doc(projectId)
    .delete()
    .then(() => {
      Notify.create("Project deleted");
      commit("deleteProject", projectId);
    })
    .catch(err => {
      showErrorMessage(err.message);
    });
}

export function setSearch({ commit }, value) {
  commit("setSearch", value);
}
