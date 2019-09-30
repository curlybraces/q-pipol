import { firebaseRealtime } from "boot/firebase";

const state = {
  directory: [],
  directoryDownloaded: false
};

const mutations = {
  setDirectoryDownloaded(state, value) {
    state.directoryDownloaded = value;
  },
  addDirectory(state, payload) {
    state.directory.push(payload);
  },
  updateDirectory(state, payload) {
    let index = state.directory.findIndex(
      directory => directory.id == payload.id
    );
    state.directory.splice(index, 1);
    state.directory.push(payload);
  },
  deleteDirectory(state, id) {
    state.directory = state.directory.filter(directory => {
      return directory.id != id;
    });
  }
};

const actions = {
  fbReadData({ commit }) {
    // let ref = firebaseDb.collection("directory");
    let ref = firebaseRealtime.ref("directory");

    ref.once("value").then(() => {
      commit("setDirectoryDownloaded", true);
    });

    ref.on("child_added", snapshot => {
      let payload = snapshot.val();
      payload.id = snapshot.key;

      commit("addDirectory", payload);
    });

    ref.on("child_changed", snapshot => {
      let payload = snapshot.val();
      payload.id = snapshot.key;
      commit("updateDirectory", payload);
    });

    ref.on("child_removed", snapshot => {
      commit("deleteDirectory", snapshot.key);
    });

    // ref.onSnapshot(snapshot => {
    //   commit("setDirectoryDownloaded", true);
    //   snapshot.docChanges().forEach(change => {
    //     if (change.type == "added") {
    //       let directory = change.doc.data();
    //       directory.id = change.doc.id;
    //       commit("addDirectory", directory);
    //     } else if (change.type == "removed") {
    //       commit("deleteDirectory", change.doc.id);
    //     } else if (change.type == "modified") {
    //       let directory = change.doc.data();
    //       directory.id = change.doc.id;
    //       commit("updateDirectory", directory);
    //     }
    //   });
    // });
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
