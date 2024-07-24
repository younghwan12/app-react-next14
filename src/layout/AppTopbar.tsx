/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import React, { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { AppTopbarRef } from "@/types";
import { LayoutContext } from "./context/layoutcontext";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/ui/dropdown-menu";
import { CalendarDays, Home, Moon, Sun, UserIcon } from "lucide-react";

// import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { setTheme } = useTheme();
    const currentTheme = useRef("light");
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current,
    }));

    const changeTheme = () => {
        console.log(currentTheme);
        currentTheme.current = currentTheme.current === "light" ? "dark" : "light";
        setTheme(currentTheme.current);
        return;
    };

    return (
        <div className="layout-tobar fixed flex h-20 left-0 top-0 w-full px-8 items-center">
            <Link href="/" className="layout-topbar-logo">
                <span>LOGO</span>
            </Link>
            <Link href="/demo" className="ml-5">
                <span>DEMO</span>
            </Link>

            <button
                ref={menubuttonRef}
                type="button"
                className="p-link layout-menu-button layout-topbar-button"
                onClick={onMenuToggle}
            >
                <i className="pi pi-bars" />
            </button>

            <button
                ref={topbarmenubuttonRef}
                type="button"
                className="p-link layout-topbar-menu-button layout-topbar-button"
                onClick={showProfileSidebar}
            >
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className="flex ml-auto">
                <Button variant="outline" size="icon" onClick={changeTheme} className="mr-3">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
                <Button variant="outline" size="icon" className="mr-3">
                    <Link href="/"></Link>
                    <Home className="h-[1.2rem] w-[1.2rem]" />
                </Button>
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <Button variant="outline" size="icon">
                            <UserIcon className="h-[1.2rem] w-[1.2rem]" />
                        </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                        <div className="flex space-x-4">
                            <Avatar>
                                <AvatarImage src="https://github.com/vercel.png" />
                                <AvatarFallback>VC</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">@이영환</h4>
                                <p className="text-sm font-bold">SystemMgr</p>
                                <div className="flex items-center pt-2">
                                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                                    <span className="text-xs text-muted-foreground">Joined December 2021</span>
                                </div>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div>
        </div>
    );
});

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;
