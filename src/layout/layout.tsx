"use client";

import React, { useRef } from "react";
import AppTopbar from "./AppTopbar";
import AppSidebar from "./AppSidebar";
import AppFooter from "./AppFooter";
import { AppTopbarRef } from "@/types/layout";
import { ChildContainerProps } from "@/types";

const layout = ({ children }: ChildContainerProps) => {
    const topbarRef = useRef<AppTopbarRef>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);

    return (
        <React.Fragment>
            <div>
                <AppTopbar ref={topbarRef} />
                <div ref={sidebarRef} className="layout-sidebar">
                    <AppSidebar />
                </div>
                <div className="layout-main-container">
                    <div className="layout-main">
                        <main className="flex min-h-screen flex-col items-center justify-between p-24">{children}</main>
                    </div>
                </div>
                <AppFooter />
            </div>
        </React.Fragment>
    );
};

export default layout;
