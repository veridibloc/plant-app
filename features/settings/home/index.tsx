"use client"

import { AccountInfo } from "./sections/accountInfo";
import { NavigationLinks } from "./sections/navigationLinks";

export const Settings = () => {
  return (
    <div className="flex flex-col items-start justify-start pt-6 mb-28 w-full gap-8">
      <AccountInfo />
      <NavigationLinks />
    </div>
  );
};
