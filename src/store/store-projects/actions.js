import { Notify, Loading } from "quasar";
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

export function updateProjectStatus({ dispatch }, payload) {
  dispatch("fbUpdateProjectStatus", payload);
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
        let payload = {
          id: change.doc.id,
          project: project
        };
        commit("updateProject", payload);
      }
    });
  });
}

export function fbAddProject({}, payload) {
  let userId = firebaseAuth.currentUser.uid;

  let project = payload;
  project.addedBy = userId;
  project.status = "new";

  Loading.show();

  projectRef
    .doc()
    .set(project)
    .then(() => {
      Loading.hide();
      Notify.create("Project Added");
      this.$router.push("/projects");
    })
    .catch(err => {
      Loading.hide();
      showErrorMessage(err.message);
    });
}

export function fbUpdateProject({}, payload) {
  let userId = firebaseAuth.currentUser.uid;
  payload.project.updatedBy = userId;

  let project = projectRef.doc(payload.id);

  Loading.show();
  project
    .update(payload.project)
    .then(() => {
      Loading.hide();
      Notify.create("Project updated.");
    })
    .catch(err => {
      Loading.hide();
      Notify.create(err.message);
    });
}

export function fbUpdateProjectStatus({}, payload) {
  projectRef
    .doc(payload.id)
    .update({
      status: payload.status
    })
    .then(() => {
      Notify.create("Project status updated.");
      // commit("setProjectStatus", {
      //   id: payload.id,
      //   status: payload.status
      // });
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
