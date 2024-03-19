"use client"
import {MaterialStocks} from "./sections/materialStocks";
import {AccountBalances} from "./sections/accountBalance";
import {PageContainer} from "@/ui/components/Layout/PageContainer";

export const Dashboard = () => {
    return (
        <PageContainer>
                <MaterialStocks/>
                <AccountBalances/>
        </PageContainer>
    );
};
