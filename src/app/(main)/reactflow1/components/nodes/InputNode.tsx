import React, { memo, ReactNode } from "react";
import { Handle, NodeProps, Position, Node } from "@xyflow/react";

export type TurboNodeData = {
    name: string;
    icon?: ReactNode;
    desc?: string;
    type?: string;
};

const InputNode = ({ data }: NodeProps<Node<TurboNodeData>>) => {
    return (
        <>
            <div className="wrapper gradient">
                <div className="inner">
                    <div className="body">
                        <div>
                            <div className="title">{data.name}</div>
                            {data.desc && <div className="subline">{data.desc}</div>}
                        </div>
                    </div>
                    <Handle
                        type="source"
                        className="w-3 h-7 bg-gray-400 rounded-none border-white"
                        position={Position.Right}
                    />
                </div>
            </div>
        </>
    );
};

export default InputNode;
