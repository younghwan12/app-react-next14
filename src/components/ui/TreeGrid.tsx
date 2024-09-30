// components/TreeGridComponent.tsx
import React from "react";

interface TreeGridComponentProps {
    uuid: string;
    ysize: number;
}

const TreeTable: React.FC<TreeGridComponentProps> = ({ uuid, ysize }) => {
    return <div id={uuid} style={{ height: ysize }}></div>;
};

export default TreeTable;
