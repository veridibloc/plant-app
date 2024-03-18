import {UserProfile} from "@clerk/nextjs";
import {AccountInfoInjection} from "@/features/settings/account";

export default function Page({params: {locale}}: { params: { locale: string } }) {

    return (
        <div className="mt-8 mb-28 w-full">
            <AccountInfoInjection targetClass="cl-profileSectionContent"/>
            <UserProfile path={`/${locale}/settings/account`} routing="path" />
        </div>
    );
}
