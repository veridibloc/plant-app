import {ChildrenProps} from "@/types/childrenProps";
import React from "react";


interface Props {
    label: string;
    items: Record<string, any>;
    renderItem: (id:string, item: any, index: number) => React.ReactNode;
    onSelected: (id: string) => void;
}

export const DropDown = ({label, items, onSelected, renderItem}: Props) => {
    const id  = `hs-dropdown-${label}`;
    return (
        <div className="hs-dropdown relative inline-flex">
            <button id={id} type="button"
                    className="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                {label}
                <svg className="hs-dropdown-open:rotate-180 size-4" xmlns="http://www.w3.org/2000/svg" width="24"
                     height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                </svg>
            </button>

            <div
                className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
                aria-labelledby={id}>
                {Object.entries(items).map(([id, item], index) => {
                    return <DropDownItem key={id} id={id} onSelected={onSelected}>
                        {renderItem(id, item, index)}
                    </DropDownItem>
                })}
            </div>
        </div>
    )
}

interface DropDownItemProps extends ChildrenProps {
    id: string;
    onSelected: (id: string) => void;
}

const DropDownItem = ({onSelected, children, id}: DropDownItemProps) => {
    return <div data-id={id}
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                onClick={() => onSelected(id)}
    >
        {children}
    </div>

}