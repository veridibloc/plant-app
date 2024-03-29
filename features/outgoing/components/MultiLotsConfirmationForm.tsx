import {LotsInfo} from "@/features/outgoing/components/LotsInfo";
import {LotReceiptData} from "@veridibloc/smart-contracts";
import {FormSubmitButton} from "@/ui/components/Buttons/FormSubmitButton";

interface Props {
    materialSlug: string;
    stockContractId: string;
    lots: LotReceiptData[];
    action: any;
}

export function MultiLotsConfirmationForm({lots, materialSlug, stockContractId, action}: Props) {
    return <>
        <LotsInfo materialSlug={materialSlug} stockContractId={stockContractId} lots={lots}/>
        <form action={action}>
            <FormSubmitButton label="Confirm" loading={false} />
        </form>
    </>
}