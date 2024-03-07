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

/**
 * @deprecated This is not needed anymore as we use the AccountContext
 * @param children
 * @param publicKey
 * @constructor
 */
export const PublicKeyProvider: FC<Props> = ({ children, publicKey = "" }) => {
  return (
    <PublicKeyContext.Provider value={{ publicKey }}>
      {children}
    </PublicKeyContext.Provider>
  );
};
