import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { API, fetcher } from "../../../config";

export function MovieCredit({ mediaType }) {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    API.getDetailMeta(movieId, "credits", mediaType),
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const { cast } = data;
  return (
    <div className="pt-10 md:pb-10">
      <h2 className="section-title-primary">Series Cast</h2>
      <Swiper
        grapcursor="true"
        spaceBetween={40}
        slidesPerView={3}
        breakpoints={{
          480: {
            slidesPerView: 4,
          },
          620: {
            slidesPerView: 5,
          },
        }}
      >
        {cast?.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="cast-item">
              <img
                src={API.getImageUrl(item.profile_path)}
                alt=""
                className="w-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-xl">{item.name}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
