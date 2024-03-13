"use client";

import { MaterialsCollected } from "./sections/materialsCollected";
import { AccountBalances } from "./sections/accountBalance";
import { CollectPointsCta } from "./sections/collectPointsCta";

export const Dashboard = () => {
  return (
    <div className="flex flex-col items-start justify-start min-h-[85vh] pt-6 mb-28 w-full gap-4">
      <MaterialsCollected />
      <AccountBalances />
      <CollectPointsCta />
    </div>
  );
};
