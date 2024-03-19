import { useAppContext } from "@/ui/hooks/useAppContext";

export const useLedgerService = () => {
  const {
    Ledger: { Service },
  } = useAppContext();

  return Service;
};
