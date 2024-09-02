import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {ConverterOutgoing} from "@/features/outgoing/converter";

export default function Page() {
  return <PageContainer hasBackButton={false}>
      <ConverterOutgoing />
  </PageContainer>
}
