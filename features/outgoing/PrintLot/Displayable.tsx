import QRCode from "react-qr-code";
import {MaterialCard} from "@/ui/components/Materials";
import {useTranslations} from "next-intl";
import {DisplayablePrintableProps} from "./DisplayablePrintableProps";
import {IconButton} from "@/ui/components/Buttons/IconButton";
import {RiPrinterLine} from "react-icons/ri";


export function Displayable({weight, materialLabel, identifier, stockContractId}: DisplayablePrintableProps) {
    const tm = useTranslations("materials");
    const t = useTranslations("common");

    const handlePrint = () => {
        window.print()
    }

    return (
        <section className="print:hidden mt-2 flex flex-col justify-between items-center w-full h-[55vh]">
            <section className="w-full">
                <MaterialCard label={tm(`${materialLabel}.label`)} description={tm(`${materialLabel}.description`)}
                              id={stockContractId} weight={weight} showWeight={true}/>
            </section>
            <div className="mt-2 p-1 text-center mx-auto">
                <div>
                    <QRCode
                        style={{
                            maxWidth: "256px",
                            padding: "0.5rem",
                            margin: "0 auto"
                        }}
                        value={identifier}
                        viewBox={`0 0 256 256`}
                    />
                </div>
                <div className="hidden md:block text-xs md:text-sm text-gray-400">ID: {identifier}</div>
            </div>
            <div>
                <IconButton icon={<RiPrinterLine size={24}/>} label={t("print")} onClick={handlePrint} className="w-full h-[60px]"/>
            </div>
        </section>
    )
}