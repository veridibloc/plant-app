import QRCode from "react-qr-code";
import {useTranslations} from "next-intl";
import {DisplayablePrintableProps} from "./DisplayablePrintableProps";
import {SimpleCard} from "@/ui/components/Cards/SimpleCard";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {Address} from "@signumjs/core";
import {Avatar} from "@/ui/components/Avatar";
import {AvatarImage} from "@/ui/components/Avatar/AvatarImage";
import {Logo} from "@/ui/components/Logo";


export function Printable({identifier, weight, materialLabel}: DisplayablePrintableProps) {
    const tm = useTranslations("materials");
    const {publicKey, logoUrl} = useUserAccount()

    materialLabel = materialLabel.toLowerCase();

    return (
        <div className="screen:hidden mt-2 flex flex-col justify-evenly items-center w-full space-y-4 h-[80vh] overflow-y-hidden">
            <section>
                <Logo />
            </section>
            <section className="p-1 text-center">
                <div>
                    <QRCode
                        size={400}
                        style={{
                            maxWidth: "100%",
                            width: "100%",
                            padding: "0.5rem",
                        }}
                        value={identifier}
                        viewBox={`0 0 256 256`}
                    />
                </div>
                <div className="text-sm text-gray-400">ID: {identifier}</div>
            </section>
            <section className="w-auto">
                <SimpleCard title="">
                    <div className="flex flex-row items-center space-x-2">
                        <Avatar size={80}>
                            <AvatarImage rounded={false} src={logoUrl} alt={"Company Image"} />
                        </Avatar>
                        <div className="space-y-1">
                            <p className="text-lg font-medium">{tm(`${materialLabel}.label`)} - {tm(`${materialLabel}.description`)} - {weight} kg</p>
                            <p className="text-xs text-gray-400">ID: {Address.fromPublicKey(publicKey).getNumericId()}</p>
                        </div>
                    </div>
                </SimpleCard>
            </section>
        </div>
    )
}