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
import useGetUser from "../hooks/useGetUser";

export const updateFavorite = async (e, idMovie, userid) => {
  e.preventDefault();
  const updateData = doc(db, "users", userid);
  await updateDoc(updateData, {
    listFavorite: arrayUnion(idMovie),
  }).then(() => {
    console.log("Success");
  });
};
