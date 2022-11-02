import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBBuyKADtiUDgjue6uD7uGgJFxizomdlxQ',
  authDomain: 'crwn-store-v2.firebaseapp.com',
  projectId: 'crwn-store-v2',
  storageBucket: 'crwn-store-v2.appspot.com',
  messagingSenderId: '969270162050',
  appId: '1:969270162050:web:7f232e9bbc5bcb56a7ba9b',
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  console.log();

  return userDocRef;
};
