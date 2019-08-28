// first, we need these 3 submodules from the firebase module
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// then, we apply the configuration provided on our firebase dashboard
const config = {
  apiKey: 'AIzaSyBrBiuCDnbzLFntiOIoJKgmmzZ6fK3S-GI',
  authDomain: 'crown-db-cceb8.firebaseapp.com',
  databaseURL: 'https://crown-db-cceb8.firebaseio.com',
  projectId: 'crown-db-cceb8',
  storageBucket: '',
  messagingSenderId: '1079229993881',
  appId: '1:1079229993881:web:5f4cae4d6f9f3fb7'
};

export const createUserDoc = async (userAuth, additionalData) => {
  if (!userAuth) return;
  // prepare query ref and snap
  let docRef = db.doc(`/users/${userAuth.uid}`);
  let docSnap = await docRef.get();

  // if empty doc, create
  if (!docSnap.exists) {
    let { displayName, email } = userAuth; // doc properties
    let createdAt = new Date(); // doc created date

    try {
      // write the newly created doc to the firestore
      await docRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('Error creating user.', error);
    }
  }

  return docRef;
};

export const convertCollectionsSnapshotToMap = collection => {
  const transformedCollection = collection.docs.map(docSnapshot => {
    const { title, items } = docSnapshot.data();

    return {
      title,
      items,
      routeName: encodeURI(title.toLowerCase()),
      id: docSnapshot.id
    };
  });

  return transformedCollection.reduce((collectionMap, collection) => {
    collectionMap[collection.title.toLowerCase()] = collection;
    return collectionMap;
  }, {});
};

// initialize firebaseApp
firebase.initializeApp(config);

// last, we export any utils we want to use on our app

export const auth = firebase.auth();
export const db = firebase.firestore();

// custom options for signIn util
const authProvider = new firebase.auth.GoogleAuthProvider();
authProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoggle = () => auth.signInWithPopup(authProvider);

export default firebase;
