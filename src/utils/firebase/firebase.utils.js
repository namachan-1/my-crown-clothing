import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1eMDsxK-tquMGS5mAeit66WL-3pFoIEM",
    authDomain: "crown-clothing-db-16abb.firebaseapp.com",
    projectId: "crown-clothing-db-16abb",
    storageBucket: "crown-clothing-db-16abb.appspot.com",
    messagingSenderId: "538269719281",
    appId: "1:538269719281:web:3bf42f3cf1d3d5baf56750"
  };
  
  // Initialize Firebase (SDK)
  const firebaseApp = initializeApp(firebaseConfig);

  const provider =  new GoogleAuthProvider();

  provider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    console.log(userSnapshot);

    // check if user data exists
    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        // create/set the document with the 
        // data from userAuth in my collection
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      } catch (error) {
        // if user data does not exist
        console.log('error creating the user', error.message);
      }
    }
    
    // return userDocRef
    return userDocRef;
  }