
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyADok7wlm4-TFbx1WG3tYC2WR6NaLXiWMc",
  authDomain: "chat-app-yada.firebaseapp.com",
  projectId: "chat-app-yada",
  storageBucket: "chat-app-yada.firebasestorage.app",
  messagingSenderId: "259224773518",
  appId: "1:259224773518:web:e3ddd43b93b9d49de0badf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username,email,password)=>{
 try {
    const res = await createUserWithEmailAndPassword(auth,email,password);
    const user = res.user;
    await setDoc(doc(db,"users",user.uid),{
        id:user.uid,
        username:username.toLowerCase(),
        email,
        name:"",
        avatar:"",
        bio:"Hey, There i am using Chat App",
        lastSeen:Date.now(),
    })
    await setDoc(doc(db,"Chats",user.uid),{
        chatData:[],
    })
 } catch (error) {
    console.log(error)
    toast.error(error.code)
 }
}

export {auth,signup}
