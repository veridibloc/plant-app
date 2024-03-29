import {Outgoing} from "@/features/outgoing";
import {PageContainer} from "@/ui/components/Layout/PageContainer";

export default function Page() {
  return <PageContainer hasBackButton={false}>
        <Outgoing />
  </PageContainer>
}
