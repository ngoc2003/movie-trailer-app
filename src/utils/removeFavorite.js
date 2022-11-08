import {
  doc,
  updateDoc,
} from "firebase/firestore";
import { AiFillHeart } from "react-icons/ai";
import { db } from "../firebase/firebase.config";
import useGetUser from "../hooks/useGetUser";

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
  const user = useGetUser()
  return (
    <span
      onClick={(e) => removeFavorite(e, id, mediaType, user)}
      className={`${className}`}
    >
      <AiFillHeart></AiFillHeart>
    </span>
  );
};
export default Heart;
