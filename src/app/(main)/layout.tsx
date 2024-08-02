import { Layout } from "@/layout";
import { Metadata } from "next";

interface AppLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "layout",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function AppLayout({ children }: AppLayoutProps) {
    return <Layout>{children}</Layout>;
}
