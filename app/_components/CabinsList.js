import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

const CabinsList = async ({ filter = "all" }) => {
  const cabins = await getCabins();
  if (!cabins.length) {
    return null;
  }
  const displayedCabins =
    {
      all: cabins,
      small: cabins.filter((cabin) => cabin.maxCapacity <= 3),
      medium: cabins.filter(
        (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
      ),
      large: cabins.filter((cabin) => cabin.maxCapacity >= 8),
    }[filter] ?? cabins;
  console.log(displayedCabins);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
};

export default CabinsList;
