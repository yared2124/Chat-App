// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyC9EI_jjYhtN5cjiDtrW05JWnPl1XuDRNM",
//   authDomain: "chat-app-yared.firebaseapp.com",
//   projectId: "chat-app-yared",
//   storageBucket: "chat-app-yared.firebasestorage.app",
//   messagingSenderId: "972077008977",
//   appId: "1:972077008977:web:f1fd13cfa6995eca671070",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db = getFirestore(app);
// const db = getFirestore(app);

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
    toast.error(error.code);
  }
};

export { signup };
