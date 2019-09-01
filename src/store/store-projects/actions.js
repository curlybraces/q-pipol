import { Notify } from "quasar";
import { firebaseAuth, firebaseDb } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";

export function addProject({ dispatch }, project) {
  dispatch("fbAddProject", project);
}

export function updateProject({ dispatch }, payload) {
  dispatch("fbUpdateProject", payload);
}

export function deleteProject({ dispatch }, payload) {
  dispatch("fbDeleteProject", payload.id);
}

export function fbReadData({ commit }) {
  firebaseDb.collection("projects")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let project = doc.data();
        project.id = doc.id;
        commit("addProject", project);
      })
    })
    .catch(err => {
      console.log(err)
    });
  // let userId = firebaseAuth.currentUser.uid;
  // let userProjects = firebaseDb.ref("projects/" + userId);
  //
  // // initial check for data
  // userProjects.once("value", () => {
  //   commit("setProjectsDownloaded", true);
  // });
  //
  // // child added
  // userProjects.on("child_added", snapshot => {
  //   let project = snapshot.val();
  //
  //   let payload = {
  //     id: snapshot.key,
  //     project: project
  //   };
  //
  //   commit("addProject", payload);
  // });
  //
  // // child updated
  // userProjects.on("child_changed", snapshot => {
  //   let project = snapshot.val();
  //
  //   let payload = {
  //     id: snapshot.key,
  //     updates: project
  //   };
  //
  //   commit("updateProject", payload);
  // });
  //
  // // child removed
  // userProjects.on("child_removed", snapshot => {
  //   let projectId = snapshot.key;
  //   commit("deleteProject", projectId);
  // });
}

export function fbAddProject({}, payload) {
  let userId = firebaseAuth.currentUser.uid;
  let projectRef = firebaseDb.ref("projects/" + userId + "/" + payload.id);
  projectRef.set(payload.project, error => {
    if (error) {
      showErrorMessage(error.message);
    } else {
      Notify.create("Project Added");
    }
  });
}

export function fbUpdateProject({}, payload) {
  let userId = firebaseAuth.currentUser.uid;
  let projectRef = firebaseDb.ref("projects/" + userId + "/" + payload.id);
  projectRef.update(payload.updates, error => {
    if (error) {
      showErrorMessage(error.message);
    } else {
      Notify.create("Project Updated");
    }
  });
}

export function fbDeleteProject({}, projectId) {
  let userId = firebaseAuth.currentUser.uid;
  let projectRef = firebaseDb.ref("projects/" + userId + "/" + projectId);
  projectRef.remove(error => {
    if (error) {
      showErrorMessage(error.message);
    } else {
      Notify.create("Project Deleted");
    }
  });
}

export function setSearch({ commit }, value) {
  commit("setSearch", value);
}
