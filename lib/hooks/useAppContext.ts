import { useContext } from "react";
import { AppContext, AppContextType } from "@/context/AppContext";

export const useAppContext = (): AppContextType => {
  return useContext(AppContext);
};
