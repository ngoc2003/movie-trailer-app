import {
  AiFillHome,
  AiFillClockCircle,
  AiFillStar,
  AiFillSetting,
} from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import {
  RiCompassDiscoverFill,
  RiSlideshow3Fill,
  RiMovie2Fill,
} from "react-icons/ri";
import { MdOutlineTrendingUp, MdMovie } from "react-icons/md";
export const sidebar = [
  {
    group: "Menu",
    items: [
      {
        name: "Home",
        path: "/",
        icon: <AiFillHome></AiFillHome>,
      },
      {
        name: "Community",
        path: "/community",
        icon: <HiUserGroup></HiUserGroup>,
      },
      {
        name: "Discover",
        path: "/discover",
        icon: <RiCompassDiscoverFill></RiCompassDiscoverFill>,
      },
    ],
  },
  {
    group: "Library",
    items: [
      {
        name: "Recent",
        path: "/recent",
        icon: <AiFillClockCircle></AiFillClockCircle>,
      },
      {
        name: "Trending",
        path: "/trending",
        icon: <MdOutlineTrendingUp></MdOutlineTrendingUp>,
      },
      {
        name: "Top rated",
        path: "/top_rated",
        icon: <AiFillStar></AiFillStar>,
      },
    ],
  },
  {
    group: "Categories",
    items: [
      {
        name: "TV Series",
        path: "/tv",
        icon: <RiMovie2Fill></RiMovie2Fill>,
      },
      {
        name: "Movies",
        path: "/movie",
        icon: <MdMovie></MdMovie>,
      },
      // {
      //   name: "Anime",
      //   path: "/anime",
      //   icon: <RiSlideshow3Fill></RiSlideshow3Fill>,
      // },
    ],
  },
  {
    group: "general",
    items: [
      {
        name: "settings",
        path: "/setting",
        icon: <AiFillSetting></AiFillSetting>,
      },
      
    ],
  },
];
