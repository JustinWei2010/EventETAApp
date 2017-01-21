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
