import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { API, fetcher } from "../../config";
import Button from "../Button";
import Loading from "../Loading";

export default function BannerItem({ item }) {
  const navigate = useNavigate();
  const { poster_path, title, id } = item;
  const { data, error } = useSWR(API.getMovieDetail(id), fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <Loading></Loading>;
  const { genres } = data;
  return (
    <div className="w-full h-full relative rounded-lg overflow-hidden">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.6)] rounded-lg "></div>
      <img
        className="w-full h-full object-contain rounded-lg"
        src={API.getImageUrl(poster_path, "w500")}
        alt=""
      />
      <div className="content absolute left-0 bottom-0 w-full p-3 text-white">
        <h2 className="capitalize text-white mb-6 font-bold text-4xl">{title}</h2>
        <div className="flex items-center flex-wrap mb-8">
          {genres?.map((genre) => (
            <div
              className="inline-block py-1 px-4 mr-3 mb-2 rounded-md border border-white"
              key={genre.id}
            >
              {genre.name}
            </div>
          ))}
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)} className="w-auto">
          Watch Now
        </Button>
      </div>
    </div>
  );
}
