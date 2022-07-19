import { useParams } from "react-router-dom";
import useSWR from "swr";
import { API, fetcher } from "../../../config";

export function MovieVideo() {
    const { movieId } = useParams();
    const { data, error } = useSWR(API.getDetailMeta(movieId, "videos"), fetcher);
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
  
    const { results } = data;
    return (
      <>
        {results
          ?.filter((item) => {
            return item.type === "Trailer" && item;
          })
          ?.map((item) => (
            <div key={item.id} className="w-full aspect-video py-10">
              <h2 className="section-title-primary">
                {item.name}
              </h2>
              <iframe
                id={item.id}
                className="w-full h-full object-fill"
                src={API.getYoutubeVideo(item.key)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
      </>
    );
  }