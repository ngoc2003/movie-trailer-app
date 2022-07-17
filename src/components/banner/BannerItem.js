export default function BannerItem({ item }) {
  const { poster_path, title, genres } = item;
  console.log(item);
  return (
    <div className="w-full h-full relative rounded-lg">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg "></div>
      <img
        className="w-full h-full object-contain rounded-lg"
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
      />
      <div className="content absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className=" py-1 px-3 rounded-md border border-white">
            Avenger
          </span>

          {/* <span className=" py-1 px-3 rounded-md border border-white">
            Avengers
          </span>
          <span className=" py-1 px-3 rounded-md border border-white">
            Avengers
          </span> */}
        </div>
        <button className="py-3 px-6 rounded-lg font-medium bg-primary text-white">
          Watch Now
        </button>
      </div>
    </div>
  );
}
