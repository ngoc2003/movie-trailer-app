import { doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import MovieCard from "../components/movie/MovieCard";
import { useAuth } from "../context/auth-context";
import useGetUser from "../hooks/useGetUser";
import defaultAvatar from "../images/avatar_default.jpg";
import { handleChangeSecondToDate } from "../utils/handleChangeSecondToDate";
const UserPage = () => {
  const { userInfo } = useAuth();
  const user = useGetUser();
  const listFavorite = user?.listFavorite 
  return (
    userInfo && (
      <div className=" page-container text-slate-900">
        <div className="px-5 py-5 bg-white xs:mt-10 rounded-xl">
          <div className="gap-10 text-center xs:text-left xs:flex">
            <div className="xs:-translate-y-16 ">
              <img
                src={userInfo.image || defaultAvatar}
                className="w-32 h-32 mx-auto border rounded-full shadow-md xs:mx-0"
                alt=""
              />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-semibold xs:text-3xl">{userInfo.fullName}</h4>
              <p className="mt-1 text-sm text-gray-500">
                Join <span className="text-primary">Tl movie</span> at{" "}
                {handleChangeSecondToDate(
                  userInfo.createdAt && userInfo.createdAt.seconds
                )}
              </p>
            </div>
          </div>
          <hr />
          <div className="pt-8">
            <h4 className="section-title-primary">My favorite list <span className="text-gray-500 ">({listFavorite && listFavorite.length})</span></h4>
            <div className="grid grid-cols-1 gap-10 xs:grid-cols-2 md:grid-cols-3">
              {listFavorite && listFavorite.length > 0 &&
                listFavorite.map((item) => (
                  <MovieCard
                    key={item.id}
                    movieid={item.id}
                    mediaType={item.type}
                  ></MovieCard>
                ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserPage;
