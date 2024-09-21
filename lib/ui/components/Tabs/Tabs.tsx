"use client"

import React, {ReactElement, useState} from "react";
import {type TabProps} from "./Tab";

interface TabsProps {
    children: ReactElement<TabProps>[];
    className?: string;
}

export const Tabs: React.FC<TabsProps> = ({children, className}) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="flex-col flex h-full w-full">
            <div className="flex flex-row justify-between w-full space-x-4 border-b">
                {children.map((child, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 text-lg w-full font-medium ${activeTab === index ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {child.props.label}
                    </button>
                ))}
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
                {children[activeTab]}
            </div>
        </div>
    );
};