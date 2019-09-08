import { firebaseAuth, firebaseDb } from "boot/firebase";

export function addRating() {
  //
}

export function fbReadData({ commit }) {
  let userId = firebaseAuth.currentUser.uid;
  let ref = firebaseDb.collection("ratings").where("ratedBy","==",userId);
  ref.onSnapshot(snapshot => {
    commit("setRatingsDownloaded", true);
    snapshot.docChanges().forEach(change => {
      if (change.type == "added") {
        let rating = change.doc.data();
        rating.id = change.doc.id;
        commit("addRating", rating);
      } else if (change.type == "removed") {
        commit("deleteRating", change.doc.id);
      }
    });
  });
}