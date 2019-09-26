import { Notify } from "quasar";
import { firebaseAuth, firebaseDb } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";
import slugify from "slugify";

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
  let ref = firebaseDb.collection("projects");

  ref.onSnapshot(snapshot => {
    commit("setProjectsDownloaded", true);
    snapshot.docChanges().forEach(change => {
      if (change.type == "added") {
        let project = change.doc.data();
        project.id = change.doc.id;
        commit("addProject", project);
      } else if (change.type == "removed") {
        commit("deleteProject", change.doc.id);
      }
    });
  });
}

export function fbAddProject({ }, payload) {
  let userId = firebaseAuth.currentUser.uid;

  let ref = firebaseDb.collection("projects");
  let project = payload;
  let slug = slugify(project.implementingAgency + ' - ' + project.title, {
    lower: true,
    remove: /[*+~.()'"!:@]/g
  });
  project.addedBy = userId;

  let docRef = ref.doc(slug);
  docRef.set(project)
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
  let projectRef = firebaseDb.collection("projects").doc(payload.id);
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
  firebaseDb
    .collection("projects")
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
