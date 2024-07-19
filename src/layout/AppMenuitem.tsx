"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useContext } from "react";
import { MenuContext } from "./context/menucontext";
import { AppMenuItemProps } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";

const AppMenuitem = (props: AppMenuItemProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { activeMenu, setActiveMenu } = useContext(MenuContext);
  const item = props.item;
  const key = props.parentKey
    ? props.parentKey + "-" + props.index
    : String(props.index);
  const isActiveRoute = item!.to && pathname === item!.to;
  const active = activeMenu === key || activeMenu.startsWith(key + "-");
  const onRouteChange = (url: string) => {
    if (item!.to && item!.to === url) {
      setActiveMenu(key);
    }
  };

  useEffect(() => {
    onRouteChange(pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  const itemClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    //avoid processing disabled items
    if (item!.disabled) {
      event.preventDefault();
      return;
    }

    //execute command
    if (item!.command) {
      item!.command({ originalEvent: event, item: item });
    }

    // toggle active state
    if (item!.items) setActiveMenu(active ? (props.parentKey as string) : key);
    else setActiveMenu(key);
  };

  return (
    // <li className={{`layout-root-menuitem': props.root, 'active-menuitem': active }}>
    //     {subMenu}
    // </li>
    <li>
      <div>dd</div>
    </li>
  );
};

export default AppMenuitem;
