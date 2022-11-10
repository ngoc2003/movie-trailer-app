import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { API, fetcher } from "../../config";
import Button from "../Button";
import Loading from "../Loading";
import { updateFavorite } from "../../utils/updateFavorite";
import { useAuth } from "../../context/auth-context";
import { useFavorite } from "../../hooks/useFavorite";
import Heart from "../../utils/removeFavorite";
export default function BannerItem({ item, mediaType }) {
  const {userInfo} = useAuth();
  const isFavorite = useFavorite(item?.id);

  const navigate = useNavigate();
  const { poster_path, title, id } = item;
  const { data, error } = useSWR(API.getMovieDetail(id), fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <Loading></Loading>;
  const { genres } = data;
  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.6)] rounded-lg "></div>
      <img
        className="object-contain w-full h-full rounded-lg"
        src={API.getImageUrl(poster_path, "w500")}
        alt=""
      />
      <div className="absolute bottom-0 left-0 w-full p-3 text-white content">
        <h2 className="mb-6 text-4xl font-bold text-white capitalize">
          {title}
        </h2>
        <div className="flex flex-wrap items-center mb-8">
          {genres?.map((genre) => (
            <div
              className="inline-block px-4 py-1 mb-2 mr-3 border border-white rounded-md"
              key={genre.id}
            >
              {genre.name}
            </div>
          ))}
        </div>

        <div className="inline-flex gap-5">
          <Button onClick={() => navigate(`/movie/${id}`)} className="w-auto">
            Watch Now
          </Button>
          {isFavorite ? (
            <div className="flex items-center justify-center w-8 h-8 m-auto rounded-full bg-primary">

            <Heart id={id} mediaType={mediaType}></Heart>
            </div>
          ) : (
            <Button
              outline
              onClick={(e) => updateFavorite(e, id, mediaType, userInfo)}
            >
              Add to favorite
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
