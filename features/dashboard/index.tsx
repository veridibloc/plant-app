import {MaterialStocks} from "./sections/materialStocks";
import {AccountBalances} from "./sections/accountBalance";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {Header} from "@/ui/components/Layout/Header";
import {Logo} from "@/ui/components/Logo";

export const Dashboard = () => {
    return (
        <PageContainer hasBackButton={false}>
            <Header title={<Logo/>} description=""/>
            <MaterialStocks/>
            <AccountBalances/>
        </PageContainer>
    );
};
