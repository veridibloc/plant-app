import { useAppContext } from "@/hooks/useAppContext";

export const useLedgerService = () => {
  const {
    Ledger: { Service },
  } = useAppContext();
  return Service;
};
