"use client";

import { Button } from "@/components/ui/button";
import NewGrid from "@/components/ui/newGrid";
import TreeTable from "@/components/ui/TreeGrid";
import TreeGridComponents from "@/components/ui/TreeGrid";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const EXAMPLES = {
    Static: {
        layoutUrl: "/Layouts/StaticDef.js",
        dataUrl: "/Layouts/StaticData.js",
    },
};

const TreeGridPage = () => {
    const exampleData = EXAMPLES["Static"];

    return (
        <div>
            {/* <Button onClick={currentDataCheck}>dd</Button> */}
            <TreeTable uuid={"GridMain"} ysize={450} />
        </div>
    );
};

export default TreeGridPage;
