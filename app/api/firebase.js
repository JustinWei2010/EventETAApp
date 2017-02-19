'use strict';
import firebase from 'firebase';
import FCM from 'react-native-fcm';
import { EVENT_TYPE } from 'app/constants'

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

export const updateEventEta = (event, eta) => {
  if (event.type === EVENT_TYPE.FACEBOOK) {
    const firebaseUserId = firebase.auth().currentUser.uid;
    const facebookUserId = getFacebookUserId()
    console.log(`Updating ETA for firebaseUserId: ${firebaseUserId}, facebookUserId: ${facebookUserId}, event: ${event.id}, eta: ${eta}`)
    firebase.database().ref(`/events/facebook/${event.id}/etas/${firebaseUserId}`)
            .set({ facebookUserId: facebookUserId, eta: eta.getTime(), hasArrived: false });
  }
}

export const checkInEvent = (event, attendee) => {
    if (event.type === EVENT_TYPE.FACEBOOK) {
      const firebaseUserId = firebase.auth().currentUser.uid;
      const facebookUserId = getFacebookUserId()
      const eta = new Date().getDate()
      console.log(`Checkin user for firebaseUserId: ${firebaseUserId}, facebookUserId: ${facebookUserId}, event: ${event.id}, attendee: ${attendee}`)
      firebase.database().ref(`/events/facebook/${event.id}/etas/${firebaseUserId}`)
            .set({ facebookUserId: facebookUserId, eta: eta, hasArrived: true });
      // create a task to notify other guests that you have arrived
      firebase.database().ref('/queue/arrived/tasks')
        .push({
          eventType: EVENT_TYPE.FACEBOOK,
          eventId: event.id,
          userId: firebaseUserId,
          userName: attendee.name,
          timestamp: eta
        })
    }
}

export const getEventETAs = (event) => {
  if (event.type === EVENT_TYPE.FACEBOOK) {
    console.log(`Get Single event ETA for facebook event id ${event.id}`)
    return firebase.database().ref(`/events/facebook/${event.id}/etas`).once('value')
      .then( (snapshot) => {
        return snapshot.val() })
  }
}

export const watchForEventETAs = (event, callback) => {
  if (event.type === EVENT_TYPE.FACEBOOK) {
    firebase.database().ref(`/events/facebook/${event.id}/etas`).on('value', snapshot => {
      console.log(`ETAs for facebook id ${event.id} updated!`)
      callback(snapshot.val())
    })
  }
}

export const stopWatchForEventETAs = (event) => {
  if (event.type === EVENT_TYPE.FACEBOOK) {
    console.log(`Stop watching event etas for facebook event id ${event.id}`)
    firebase.database().ref(`/events/facebook/${event.id}/etas`).off('value')
  }
}

export const subscribeToArrived = (event) => {
  if (event.type === EVENT_TYPE.FACEBOOK) {
    console.log(`Subscribing to arrived events for facebook event id ${event.id}`)
    FCM.subscribeToTopic(`/topics/arrived-facebook-${event.id}`);
  }
}