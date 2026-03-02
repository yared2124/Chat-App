// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9EI_jjYhtN5cjiDtrW05JWnPl1XuDRNM",
  authDomain: "chat-app-yared.firebaseapp.com",
  projectId: "chat-app-yared",
  storageBucket: "chat-app-yared.firebasestorage.app",
  messagingSenderId: "972077008977",
  appId: "1:972077008977:web:f1fd13cfa6995eca671070",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey, There i am using Chat App",
      lastSeen: Date.now(),
    });
    await setDoc(doc(db, "Chats", user.uid), {
      chatData: [],
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1]).split("-").join(" ");
  }
};


const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1]).split("-").join("  ");
  }
}


const logout= async() =>{
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1]).split("-").join("  ");
  }
}

export { signup,login, logout, auth, db };
