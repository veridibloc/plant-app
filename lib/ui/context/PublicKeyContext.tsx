"use client";

import { FC, createContext } from "react";
import type { ChildrenProps } from "@/types/childrenProps";

export interface PublicKeyContextType {
  publicKey: string;
}

const initialContext: PublicKeyContextType = {
  publicKey: "",
};

export const PublicKeyContext =
  createContext<PublicKeyContextType>(initialContext);

interface Props extends ChildrenProps {
  publicKey: string;
}
export const PublicKeyProvider: FC<Props> = ({ children, publicKey = "" }) => {
  return (
    <PublicKeyContext.Provider value={{ publicKey }}>
      {children}
    </PublicKeyContext.Provider>
  );
};
