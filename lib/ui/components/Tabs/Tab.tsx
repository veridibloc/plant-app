"use client"

import React, {PropsWithChildren} from "react";

export interface TabProps extends PropsWithChildren{
    label: string;
    className?: string;
}

export const Tab: React.FC<TabProps> = ({ children, className }) => {
    return <div className={className}>{children}</div>;
}