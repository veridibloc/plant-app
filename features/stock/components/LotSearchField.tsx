import {TextInput} from "@/ui/components/Inputs/TextInput";
import {useState} from "react";
import {useTranslations} from "next-intl";
import {RiSearchLine} from "react-icons/ri";

interface Props {
    onSearch: (searchTerm: string) => void
}

export function LotSearchField({onSearch}: Props) {
    const t = useTranslations("stock")
    const [value, setValue] = useState("")

    return <section className="relative w-full my-2">

        <TextInput
            label={t("search_lot")}
            placeholder={t("enter_lot_id")}
            value={value}
            debounceDelay={0}
            autocompletion="off"
            type="number"
            onChange={v => {
                v = v.replace(/\D/g, "")
                setValue(v);
                onSearch(v);
            }}/>
        <div className="absolute top-[32px] right-2">
            <RiSearchLine color="#e5e7eb" size={24} />
        </div>
    </section>
}