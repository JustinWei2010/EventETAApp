'use strict';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBJBX6DeD27mG_cMuf2ZxTbq6FB52snfD8",
  authDomain: "localhost",
  databaseURL: "https://eta-app-7f982.firebaseio.com/",
  storageBucket: " gs://eta-app-7f982.appspot.com",
};

var facebookUserId;

export const init = () => {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase app initialized.");
}

export const getFacebookUserId = () => {
  return facebookUserId;
}

export const loginWithFacebookUser = (accessToken) => {
  const credential = firebase.auth.FacebookAuthProvider.credential(accessToken);
  firebase.auth().signInWithCredential(credential)
    .then(credData => {
      console.log("Authenticated with firebase!");
      facebookUserId = credData.providerData.find(
        provider => provider.providerId === "facebook.com").uid
    }).catch(err => {
      console.log("Error authenticating with firebase! " + err);
    })
}

export const updateEventEta = (event, eta, hasArrived) => {
  if (event.facebookEventId) {
    const firebaseUserId = firebase.auth().currentUser.uid;
    const facebookUserId = getFacebookUserId()
    console.log(`Updating ETA for firebaseUserId: ${firebaseUserId}, facebookUserId: ${facebookUserId}, event: ${event.facebookEventId}, eta: ${eta}, hasArrived: ${hasArrived}`)
    firebase.database().ref(`/events/facebook/${event.facebookEventId}/etas/${firebaseUserId}`)
            .set({ facebookUserId: facebookUserId, eta: eta.getTime(), hasArrived: hasArrived });
  }
}

export const watchForEventETAs = (event, callback) => {
  if (event.facebookEventId) {
    console.log(`Watch for event ETA for facebook event id ${event.facebookEventId}`)
    firebase.database().ref(`/events/facebook/${event.facebookEventId}/etas`).on('value', snapshot => {
      console.log(`ETAs for facebook id ${event.facebookEventId} updated!`)
      callback(snapshot.val())
    })
  }
}

export const stopWatchForEventETAs = (event) => {
  if (event.facebookEventId) {
    console.log(`Stop watching event etas for facebook event id ${event.facebookEventId}`)
    firebase.database().ref(`/events/facebook/${event.facebookEventId}/etas`).off('value')
  }
}