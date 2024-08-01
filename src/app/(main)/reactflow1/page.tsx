import React from "react";
import { ReactFlow } from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import DnDFlow from "./components/DnDFlow";

export default function ReactFlow1() {
    return (
        <div className="w-full">
            <DnDFlow />
        </div>
    );
}
