import DataMap from "@/app/(pages)/data-map";
import Visualization from "@/app/(pages)/visualization";

const sideBar = [
  {
    id: "map-visual",
    title: "Map Visual",
    content: <DataMap />,
  },
  {
    id: "visualization",
    title: "Visualization",
    content: <Visualization />,
  },
  {
    id: "other",
    title: "Other",
    content: <Visualization />,
  },
];

export default sideBar;
