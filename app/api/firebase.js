'use strict';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBJBX6DeD27mG_cMuf2ZxTbq6FB52snfD8",
  authDomain: "localhost",
  databaseURL: "https://eta-app-7f982.firebaseio.com/",
  storageBucket: " gs://eta-app-7f982.appspot.com",
};

var firebaseApp;

export const init = () => {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase app initialized.");
}

export const loginWithFacebookUser = (accessToken) => {
  const credential = firebase.auth.FacebookAuthProvider.credential(accessToken);
  firebase.auth().signInWithCredential(credential)
    .then(credData => {
      console.log("Authenticated with firebase!");
    }).catch(err => {
      console.log("Error authenticating with firebase! " + err);
    })
}

export const updateEventEta = (event, eta) => {
  if (event.facebookEventId) {
    const firebaseUserId = firebase.auth().currentUser.uid;
    const facebookUserId = firebase.auth().currentUser.providerData.find(
      provider => provider.providerId === "facebook.com").uid;
    console.log(`Updating ETA for firebaseUserId: ${firebaseUserId}, facebookUserId: ${facebookUserId}, event: ${event.facebookEventId}, eta: ${eta}`)
    firebase.database().ref(`/events/facebook/${event.facebookEventId}/etas/${firebaseUserId}`)
            .set({ facebookUserId: facebookUserId, eta: eta.getTime(), hasArrived: false });
  }
}