// import useData from "./useData";
import platforms from "../data/platforms";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

const usePlatforms = () => ({
  data: platforms,
  isLoading: false,
  error: null,
});

// const usePlatforms = (selectedPlatform: Platform | null) =>
//   useData<Platform>("/platforms/lists/parents", {
//     params: { parent_platforms: selectedPlatform?.id },
//   });

export default usePlatforms;
