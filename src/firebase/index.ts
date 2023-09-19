import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updatePassword, updateEmail, sendPasswordResetEmail } from "firebase/auth";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { UserResponse, userBasicProps, userProps } from "../types/authTypes";

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
export const firebaseAuth = getAuth(app);
const database = getDatabase(app);

export const createUser = async (newUser: userProps) => {
  const { email, password } = newUser;

  try {
    const newUserRes = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const newUserData: any = {...newUser, id: newUserRes.user.uid};
    delete newUserData.password;

    await set(ref(database, `users/${newUserRes.user.uid}`), newUserData);
  } catch(error: any) {
    if (error.code === 'auth/email-already-in-use') return UserResponse.EMAIL_DUPLICADO;
    return UserResponse.NOVO_ERRO;
  }
}

export const getUser = async (userId: string) => {
  try {
    const user = await get(child(ref(database),`users/${userId}`));
    return user.val();
  } catch(e) {
    // arrumar
    return UserResponse.NOVO_ERRO;
  }
}

export const getAllUsers = async () => {
  try {
    const users = await get(child(ref(database),`users/`));
    return users.val();
  } catch(e) {
    // arrumar
    return UserResponse.NOVO_ERRO;
  }
}

export const signinUser = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(firebaseAuth, email, password);
  } catch {
    return UserResponse.DADOS_INCORRETOS;
  };
}

export const signoutUser = async () => {
  try {
    await signOut(firebaseAuth);
  } catch(error: any) {
    // arrumar
    // An error happened.
  };
};

export const updateUser = async (oldData: userBasicProps, updatedData: userProps) => {
  try {
    if(oldData.email !== updatedData.email) {
      await updateEmail(firebaseAuth.currentUser!, updatedData.email);
    };

    if(!!updatedData.password) {
      await updatePassword(firebaseAuth.currentUser!, updatedData.password);
    };

    const newUserData: any = {...oldData, ...updatedData};
    delete newUserData.password;

    await set(ref(database, `users/${newUserData.id}`), newUserData);
  } catch(e) {
    return UserResponse.ALTERAR_ERRO;
  }
};

export const recoveryPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(firebaseAuth, email);
  } catch(e: any) {
    if(e.code === 'auth/user-not-found') return UserResponse.USUARIO_NAO_CADASTRADO;
    // arrumar
    return UserResponse.ALTERAR_ERRO;
  }
};
