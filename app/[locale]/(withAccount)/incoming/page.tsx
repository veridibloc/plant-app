import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {Incoming} from "@/features/incoming";

export default function Page() {
  return <PageContainer hasBackButton={false}>
    <Incoming />
  </PageContainer>
}
