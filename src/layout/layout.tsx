"use client";

import React, { useRef } from "react";
import AppTopbar from "./AppTopbar";
import AppSidebar from "./AppSidebar";
import AppFooter from "./AppFooter";
import AppConfig from "./AppConfig";
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
          <div className="layout-main">{children}</div>
          <AppFooter />
        </div>
        <AppConfig />
        <div className="layout-mask"></div>
      </div>
    </React.Fragment>
  );
};

export default layout;
