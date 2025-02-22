"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
const labels = {
  all: "All cabins",
  small: "2 - 3 guests",
  medium: "4 - 7 guests",
  large: "8 - 12 guests",
};
const FilterCabins = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") || "all";
  const handleFilter = (filter) => {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="border border-primary-800 flex">
      {["all", "small", "medium", "large"].map((filter) => {
        return (
          <button
            key={filter}
            className={`px-5 py-2 hover:bg-primary-700 ${
              filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
            }`}
            onClick={() => handleFilter(filter)}
          >
            {labels[filter]}
          </button>
        );
      })}
    </div>
  );
};

export default FilterCabins;
