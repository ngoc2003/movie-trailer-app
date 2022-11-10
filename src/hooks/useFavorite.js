import React from "react";
import { useAuth } from "../context/auth-context";

export const useFavorite = (id) => {
  const {userInfo} = useAuth();
  if (userInfo && id) {
    const index = userInfo.listFavorite && userInfo.listFavorite.find((item) => item.id === id)
    return !!index;

  }
  return false
};
