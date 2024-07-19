"use client";

import React, { useContext, useEffect, useState } from "react";
import { AppConfigProps, LayoutConfig, LayoutState } from "@/types";
import { LayoutContext } from "./context/layoutcontext";

const AppConfig = (props: AppConfigProps) => {
  const [scales] = useState([12, 13, 14, 15, 16]);
  const { layoutConfig, setLayoutConfig, layoutState, setLayoutState } =
    useContext(LayoutContext);

  const onConfigButtonClick = () => {
    setLayoutState((prevState: LayoutState) => ({
      ...prevState,
      configSidebarVisible: true,
    }));
  };

  const onConfigSidebarHide = () => {
    setLayoutState((prevState: LayoutState) => ({
      ...prevState,
      configSidebarVisible: false,
    }));
  };

  const changeMenuMode = (e: any) => {
    setLayoutConfig((prevState: LayoutConfig) => ({
      ...prevState,
      menuMode: e.value,
    }));
  };
  const decrementScale = () => {
    setLayoutConfig((prevState: LayoutConfig) => ({
      ...prevState,
      scale: prevState.scale - 1,
    }));
  };

  const incrementScale = () => {
    setLayoutConfig((prevState: LayoutConfig) => ({
      ...prevState,
      scale: prevState.scale + 1,
    }));
  };

  const applyScale = () => {
    document.documentElement.style.fontSize = layoutConfig.scale + "px";
  };

  useEffect(() => {
    applyScale();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutConfig.scale]);

  return (
    <>
      <button
        className="layout-config-button config-link"
        type="button"
        onClick={onConfigButtonClick}
      >
        <i className="pi pi-cog"></i>
      </button>
    </>
  );
};

export default AppConfig;
