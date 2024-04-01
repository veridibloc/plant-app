import {DescriptorData} from "@signumjs/standards";

export function getMaterialSlugFromContractDescriptor(contractDescriptor: string) {
    try {
        const data = DescriptorData.parse(contractDescriptor);
        return (data.getCustomField("x-mat") as string).toLowerCase();
    } catch (e) {
        return "";
    }
}