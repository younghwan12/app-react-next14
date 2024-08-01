import { Metadata } from "next";
import Layout from "../../layout/layout";

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
