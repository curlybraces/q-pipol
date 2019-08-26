import { uid } from "quasar";
import { firebaseAuth, firebaseDb } from "boot/firebase";

export function addProject({ commit }, project) {
  let projectId = uid();
  let payload = {
    id: projectId,
    project: project
  };
  commit("addProject", payload);
}

export function fbReadData({ commit }) {
  let userId = firebaseAuth.currentUser.uid;
  let userProjects = firebaseDb.ref("projects/" + userId);

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
