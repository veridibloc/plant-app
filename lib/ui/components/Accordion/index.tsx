import {ChildrenProps} from "@/types/childrenProps";
import React, {ReactNode, useRef, useState} from "react";
import {RiArrowUpSLine} from "react-icons/ri";
import {motion} from "framer-motion";

export interface AccordionItemType {
    id:string;
    header:string|ReactNode;
    content:string|ReactNode;
    height: string|number;
}

interface Props {
    className?:string;
    items: AccordionItemType[],
}

export function Accordion({className = "", items}: Props) {

    const [expanded, setExpanded] = useState("")
    const handleToggle = (id: string) => {
        setExpanded(expanded === id ? "" : id )
    }
    return <div className={`highlight-off ${className}`}>
        {items.map((item) =>
            <AccordionItem key={item.id} item={item} onToggle={handleToggle} isExpanded={expanded === item.id}/>
        )}
    </div>

}
interface AttributeItemProps extends ChildrenProps{
    item: AccordionItemType,
    isExpanded: boolean,
    onToggle:(id:string)=>void
}

function AccordionItem({item, children, isExpanded, onToggle}: AttributeItemProps) {
    const contentRef = useRef<HTMLDivElement>(null)
    const {header, id, content, height} = item
    return (
        <>
            <div className="w-full border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700 px-4 py-1">
                <motion.button
                    className="py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400"
                    animate={isExpanded ? "expanded" : "collapsed"}
                    onClick={() => {
                        onToggle(id)
                    }}
                >
                    {header}
                    <motion.div
                        variants={{
                            expanded: {
                                rotate: '180deg'
                            },
                            collapsed: {
                                rotate: '0deg'
                            }
                        }}>
                        <RiArrowUpSLine/>
                    </motion.div>
                </motion.button>
                <div ref={contentRef} className="w-full overflow-hidden transition-[height] duration-300 ease-out"
                     style={{height: isExpanded ? height : 0}}>
                    {content}
                </div>
            </div>
        </>
    )
}