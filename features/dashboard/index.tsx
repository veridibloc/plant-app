import {MaterialStocks} from "./sections/materialStocks";
import {AccountBalances} from "./sections/accountBalance";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {Header} from "@/ui/components/Layout/Header";
import {Logo} from "@/ui/components/Logo";
import {Tab, Tabs} from "@/ui/components/Tabs";
import {useTranslations} from "next-intl";

export const Dashboard = () => {
    const t = useTranslations("dashboard")
    return (
        <PageContainer hasBackButton={false}>
            <Header title={<Logo/>} description=""/>
            <div className="w-full" style={{height: "calc(100vh - 80px - 80px - 40px)" }} >
                <Tabs>
                    <Tab label={t("material_other")}>
                        <MaterialStocks/>
                    </Tab>
                    <Tab label={t("balance_other")}>
                        <AccountBalances/>
                    </Tab>
                </Tabs>
            </div>
        </PageContainer>
    );
};
