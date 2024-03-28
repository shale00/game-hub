import useData from "./useData";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

const usePlatforms = (selectedPlatform: Platform | null) =>
  useData<Platform>("/platforms/lists/parents", {
    params: { parent_platforms: selectedPlatform?.id },
  });

export default usePlatforms;
