import {
  doc,
  updateDoc,
} from "firebase/firestore";
import { AiFillHeart } from "react-icons/ai";
import { useAuth } from "../context/auth-context";
import { db } from "../firebase/firebase.config";

const removeFavorite = async (e, idMovie, mediaType, user) => {
  if (user) {
    e.preventDefault();
    const newListFavorite = user.listFavorite.filter(item => item.id !== idMovie)
    const updateData = doc(db, "users", user?.id);
    await updateDoc(updateData, {
      listFavorite: [...newListFavorite],
    }).then(() => {
      console.log("Success");
    });
  } else {
    console.log("Failed");
  }
};

const Heart = ({id, mediaType, className=''}) => {
  const {userInfo} = useAuth()
  return (
    <span
      onClick={(e) => removeFavorite(e, id, mediaType, userInfo)}
      className={`cursor-pointer ${className}`}
    >
      <AiFillHeart></AiFillHeart>
    </span>
  );
};
export default Heart;
