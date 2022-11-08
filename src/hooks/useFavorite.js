import React from "react";
import useGetUser from "./useGetUser";

export const useFavorite = (id) => {
  const user = useGetUser();
  if (user && id) {
    const index = user.listFavorite && user.listFavorite.find((item) => item.id === id)
    return !!index;

  }
  return false
};
