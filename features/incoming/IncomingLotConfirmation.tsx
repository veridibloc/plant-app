import {Header} from "@/ui/components/Layout/Header";
import {useTranslations} from "next-intl";
import {PageContainer} from "@/ui/components/Layout/PageContainer";

interface Props {
    contractId: string;
    lotId: string;
    materialName: string;
    quantity: number;
}

export const IncomingLotConfirmation = ({quantity, materialName, lotId}: Props) => {
    const t = useTranslations("incoming.confirmation.lot")

    return <PageContainer>

        <Header title={t("title")} description={t("description")} />
        <div>{quantity}</div>
        <div>{materialName}</div>
        <div>{lotId}</div>
    </PageContainer>
}