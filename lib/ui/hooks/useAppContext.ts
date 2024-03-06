import { useContext } from "react";
import { AppContext, AppContextType } from "@/ui/context/AppContext";

export const useAppContext = (): AppContextType => {
  return useContext(AppContext);
};
