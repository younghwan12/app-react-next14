import React, { memo, ReactNode } from "react";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";

export type TurboNodeData = {
    title: string;
    icon?: ReactNode;
    desc?: string;
    type?: string;
};

const OutputNode = ({ data }: NodeProps<Node<TurboNodeData>>) => {
    return (
        <>
            <div className="wrapper gradient">
                <div className="inner">
                    <div className="body">
                        <div>
                            <div className="title">{data.title}</div>
                            {data.desc && <div className="subline">{data.desc}</div>}
                        </div>
                    </div>
                    <Handle
                        type="target"
                        className="w-3 h-7  bg-gray-400 rounded-none border-white"
                        position={Position.Left}
                    />
                </div>
            </div>
        </>
    );
};

export default OutputNode;
