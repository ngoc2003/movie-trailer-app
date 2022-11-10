import {
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth-context";
import { db } from "../firebase/firebase.config";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
const updateFavorite = async (e, idMovie, mediaType, user) => {
  if (user) {
    e.preventDefault();
    const updateData = doc(db, "users", user.id);
    await updateDoc(updateData, {
      listFavorite: arrayUnion({ id: idMovie, type: mediaType }),
    }).then(() => {
      console.log("Success");
    });
  } else {
    toast.error("You have to sign in first!");
  }
};

const Add = ({ id, mediaType }) => {
  const {userInfo} = useAuth()
  return (
    <span
      className="absolute flex items-center justify-center w-8 h-8 leading-none duration-200 rounded-full cursor-pointer hover:gap-3 top-3 right-3 bg-white/30 backdrop-blur-sm group hover:bg-primary hover:w-auto hover:px-3"
      onClick={(e) => updateFavorite(e, id, mediaType, userInfo)}
    >
      <AiOutlinePlus></AiOutlinePlus>
      <span className="hidden text-transparent group-hover:block group-hover:text-white">
        Add to favorite
      </span>
    </span>
  );
};

export {Add, updateFavorite};
