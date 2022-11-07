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
  const {listFavorite} = user
  const [data, setData] = useState("");
  useEffect(() => {});
  return (
    userInfo && (
      <div className=" page-container text-slate-900">
        <div className="px-5 py-5 mt-10 bg-white rounded-xl">
          <div className="flex gap-10">
            <div className="-translate-y-16 ">
              <img
                src={userInfo.image || defaultAvatar}
                className="w-32 h-32 border rounded-full shadow-md"
                alt=""
              />
            </div>
            <div className="flex-1">
              <h4 className="text-3xl font-semibold">{userInfo.fullName}</h4>
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
            <h4 className="section-title-primary">My favorite list</h4>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
              {listFavorite && listFavorite.length > 0 &&
                listFavorite.map((item) => (
                  <MovieCard
                    key={item}
                    id={item}
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
