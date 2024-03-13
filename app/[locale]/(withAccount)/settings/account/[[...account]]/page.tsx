import {UserProfile} from "@clerk/nextjs";
import {ClientRootLayout} from "@/ui/components/Layout/ClientRootLayout";

export default function Page({params: {locale}}: { params: { locale: string } }) {

    return (
        <div className="mt-8 mb-28 w-full">
            <UserProfile path={`/${locale}/settings/account`} routing="path"/>
        </div>
    );
}
