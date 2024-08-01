"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function Home() {
    const { setTheme } = useTheme();
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12">
            <Alert>
                {/* <Terminal className="h-4 w-4" />  */}
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>You can add components and dependencies to your app using the cli.</AlertDescription>
            </Alert>
        </main>
    );
}
