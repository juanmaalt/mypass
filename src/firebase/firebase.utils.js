import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { firebaseConfig } from "./config.firebase";
import swal from "sweetalert";

firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const updateDocument = async (objectToAdd, collectionId) => {
  const { id, title, email, user, password } = objectToAdd;
  const collectionRef = firestore.collection(collectionId);
  let docRef = undefined;

  id ? (docRef = collectionRef.doc(id)) : (docRef = collectionRef.doc());

  docRef.set({
    title: title,
    email: email,
    user: user,
    password: password,
  });
};

export const removeDocument = async (idToRemove, collectionId) => {
  const collectionRef = firestore.collection(collectionId);
  collectionRef
    .doc(idToRemove)
    .delete()
    .then(
      swal({
        title: "Success!",
        text: "Poof! Your credentials has been deleted!",
      })
    );
};

export const convertCollectionsSnapshotToMap = (collection) => {
  const transformedCollection = collection.docs.map((doc) => {
    const { title, email, user, password } = doc.data();

    return {
      id: doc.id,
      title,
      email,
      user,
      password,
    };
  });

  return transformedCollection;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
