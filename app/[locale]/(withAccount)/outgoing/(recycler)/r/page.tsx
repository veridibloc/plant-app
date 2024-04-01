import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {RecyclerOutgoing} from "@/features/outgoing/recycler";

export default function Page() {
  return <PageContainer hasBackButton={false}>
      <RecyclerOutgoing />
  </PageContainer>
}
