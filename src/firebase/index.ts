import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { UserResponse, newUserProps, userProps } from "../types/authTypes";

const firebaseConfig = {
  apiKey: "AIzaSyD7mJFeDe5hXLsZ1AX2B1Vkl_gTubASBtc",
  authDomain: "meu-lixo-app.firebaseapp.com",
  projectId: "meu-lixo-app",
  storageBucket: "meu-lixo-app.appspot.com",
  messagingSenderId: "1073914325740",
  appId: "1:1073914325740:web:ed706c05d37a7a610fd3c9",
  measurementId: "G-3DZTVDVZH3",
  databaseURL: "https://meu-lixo-app-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);
const database = getDatabase(app);

export const createUser = async (newUser: newUserProps) => {
  const { email, senha } = newUser;

  try {
    const newUserRes = await createUserWithEmailAndPassword(auth, email, senha);
    const newUserData: userProps = {...newUser, id: newUserRes.user.uid};
    await set(ref(database, `users/${newUserRes.user.uid}`), newUserData);

    return { newUserData, accessToken: 'await newUserRes.user.getIdToken()'};
  } catch(error: any) {
    if (error.code === 'auth/email-already-in-use') return UserResponse.EMAIL_DUPLICADO;
    return UserResponse.NOVO_ERRO;
  }
}

export const verifyLogin = async () => {
  console.log(auth)
  console.log(auth.currentUser?.uid);
  auth.currentUser?.getIdToken().then((xx) => console.log('user',xx));

  await signoutUser();

  console.log('22:::', auth.currentUser?.uid);
  auth.currentUser?.getIdToken().then((xx) => console.log('user 223',xx));
}

export const signinUser = (email: string, senha: string) => {
  signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error code: ${errorCode}. Error message: ${errorMessage}`)
    });
}

export const signoutUser = async () => {
  await signOut(auth)
    .then((x) => {
      console.log(x);
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
