"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { BsArrowLeftShort } from "react-icons/bs";
import { useSidebar } from "@/common/hooks/useSidebar";
import { SideNav } from "./side-nav";
import { BookOpenCheck, Calendar, CircleAlert, File, LayoutDashboard } from "lucide-react";
interface SidebarProps {
    className?: string;
}

import { type LucideIcon } from "lucide-react";

export interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
    color?: string;
    isChidren?: boolean;
    children?: NavItem[];
}

export const NavItems: NavItem[] = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/",
        color: "text-sky-500",
    },
    {
        title: "Demo",
        icon: BookOpenCheck,
        href: "/demo",
        color: "text-orange-500",
        isChidren: true,
        children: [
            {
                title: "CRUD",
                icon: BookOpenCheck,
                color: "text-red-500",
                href: "/demo",
            },
            {
                title: "ReactFlow V1",
                icon: BookOpenCheck,
                color: "text-red-500",
                href: "/reactflow1",
            },
        ],
    },
];

export default function Sidebar({ className }: SidebarProps) {
    const { isOpen, toggle } = useSidebar();
    const [status, setStatus] = useState(false);

    const handleToggle = () => {
        setStatus(true);
        toggle();
        setTimeout(() => setStatus(false), 500);
    };
    return (
        <nav
            className={cn(
                `relative hidden h-screen border-r pt-20 md:block`,
                status && "duration-500",
                isOpen ? "w-72" : "w-[78px]",
                className
            )}
        >
            <BsArrowLeftShort
                className={cn(
                    "absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
                    !isOpen && "rotate-180"
                )}
                onClick={handleToggle}
            />
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="mt-3 space-y-1">
                        <SideNav
                            className="text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100"
                            items={NavItems}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}
