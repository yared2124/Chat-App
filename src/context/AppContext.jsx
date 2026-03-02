import { createContext, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";
import { useNavigate ,userRef} from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);

  const loadUserData = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const userSnap = await getDoc(docRef);
      if(userData.avatar && userData.name){
      navigate("/chat");
      } else{
        navigate("/profile");
      }
      await updateDoc(userRef)
    } catch (error) {
      console.log(error);
    }
  };


  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
