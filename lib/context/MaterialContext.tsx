"use client";

import { FC, createContext } from "react";
import type { ChildrenProps } from "@/types/childrenProps";

interface MaterialType {
  id: string;
  slug: string;
  unit: "g" | "kg" | "t";
}

export interface MaterialContextType {
  materials: Record<string, MaterialType>;
}

// TODO: make configurable - maybe an alias could help here
const initialContext: MaterialContextType = {
  materials: {
    "1": {
      id: "1",
      slug: "plastic",
      unit: "kg",
    },
    "2": {
      id: "2",
      slug: "paper",
      unit: "kg",
    },
    "3": {
      id: "3",
      slug: "glass",
      unit: "kg",
    },
  },
};

export const MaterialContext =
  createContext<MaterialContextType>(initialContext);

interface Props extends ChildrenProps {}
export const MaterialProvider: FC<Props> = ({ children }) => {
  return (
    <MaterialContext.Provider value={initialContext}>
      {children}
    </MaterialContext.Provider>
  );
};
