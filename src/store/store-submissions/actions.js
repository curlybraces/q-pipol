import { submissionsRef } from "boot/firebase";

export function fbReadData({ commit }) {
  submissionsRef.onSnapshot(snapshot => {
    commit("setSubmissionsDownloaded", true);
    snapshot.docChanges().forEach(change => {
      if (change.type == "added") {
        let payload = change.doc.data();
        payload.id = change.doc.id;
        commit("addSubmission", payload);
      } else if (change.type == "removed") {
        commit("deleteSubmission", change.doc.id);
      } else if (change.type == "modified") {
        let payload = change.doc.data();
        payload.id = change.doc.id;
        commit("updateSubmission", payload);
      }
    });
  });
}
