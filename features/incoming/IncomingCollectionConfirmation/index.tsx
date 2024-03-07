import {Header} from "@/ui/components/Layout/Header";
import {useTranslations} from "next-intl";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {CollectorInfo} from "./CollectorInfo";

interface Props {
    accountId: string;
    materialName: string;
    quantity: number;
}

export const IncomingCollectionConfirmation = ({quantity, materialName, accountId}: Props) => {
    const t = useTranslations("incoming.confirmation.collection")

    // add hashicon as ViD
    // material selector
    // input field for confirmation
    // submit button -> SA

    return <PageContainer>
        <Header title={t("title")} description={t("description")} />
        <CollectorInfo accountId={accountId} />
        <div>{quantity}</div>
        <div>{materialName}</div>
        <div>{accountId}</div>
    </PageContainer>
}