import React, { memo, ReactNode } from "react";
import { Handle, NodeProps, Position, Node } from "@xyflow/react";

export type TurboNodeData = {
    title: string;
    icon?: ReactNode;
    desc?: string;
    type?: string;
};

const AnyNode = ({ data }: NodeProps<Node<TurboNodeData>>) => {
    return (
        <>
            <div className="cloud gradient">
                <div>
                    <i className="pi pi-cloud" />
                </div>
            </div>
            <div className="wrapper gradient">
                <div className="inner">
                    <div className="body">
                        {data.icon && <div className="icon">{data.icon}</div>}
                        <div>
                            <div className="title">{data.title}</div>
                            {data.desc && <div className="subline">{data.desc}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AnyNode;
