import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {SeparatorOutgoing} from "@/features/outgoing/separator";

export default function Page() {
  return <PageContainer hasBackButton={false}>
      <SeparatorOutgoing />
  </PageContainer>
}
