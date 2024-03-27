
// maybe makes sense to move to SDK

interface LabeledId {
    id: string;
    label: string;
}
export interface MetaInfo {
    role: "separator" | "recycler" | "converter",
    isCorporative: boolean,
    collectible: LabeledId[],
    stockContracts: LabeledId[]
}
export interface UserAccount extends MetaInfo {
    publicKey: string;
    email: string;
    logoUrl: string;
    firstName: string;
    isActive: boolean;
    encryptedSeed?: string;
}
