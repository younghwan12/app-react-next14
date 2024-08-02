"use client";

import React, { useRef, useCallback, useState } from "react";
import {
    ReactFlow,
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    useReactFlow,
    Node,
    Edge,
    MarkerType,
    Background,
} from "@xyflow/react";

import Sidebar from "../Sidebar";
// import TurboOutputNode from "./OutputNode";
// import DefaultNode from "./DefaultNode";
// import TurboEdge from "./TurboEdge";
// import FloatingEdge from "./FloatingEdge";
// import FunctionIcon from "./FunctionIcon";

import TurboInputNode, { TurboNodeData } from "../nodes/InputNode";

import TurboOutputNode from "../nodes/OutputNode";
import DefaultNode from "../nodes/DefaultNode";
import TurboEdge from "../edges/TurboEdge";
// import FloatingEdge from "../edges/FloatingEdge";
import FunctionIcon from "../nodes/FunctionIcon";
import { Button } from "@/components/ui/button";
import ContextMenu from "../ContextMenu";
import Detailbar from "../Detailbar";
import AnyNode from "../nodes/AnyNode";

const initialNodes: Node<TurboNodeData>[] = [
    // {
    //     id: "r-1",
    //     position: { x: 50, y: 50 },
    //     type: "input",
    //     data: { icon: <FunctionIcon />, title: "readFile", desc: "api.ts" },
    // },
    // {
    //     id: "r-2",
    //     position: { x: 250, y: 50 },
    //     type: "default",
    //     data: { title: "bundle", desc: "apiContents" },
    // },
];

const initialEdges: Edge[] = [
    {
        id: "B->G",
        source: "r-1",
        target: "r-2",
    },
];

const nodeTypes = {
    input: TurboInputNode,
    default: DefaultNode,
    output: TurboOutputNode,
    any: AnyNode,
};

const edgeTypes = {
    // floating: FloatingEdge,
    turbo: TurboEdge,
    // step: StepEdge,
};

const defaultEdgeOptions = {
    style: { strokeWidth: 2 },
    // type: "smoothstep",
    type: "step",
    markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        // color: "#FF0072",
    },
};

const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedData, setSelectedData] = React.useState(null);
    const { screenToFlowPosition } = useReactFlow();

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
            //const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData("application/reactflow");
            const nodeId = event.dataTransfer.getData("application/nodeId");
            const nodeName = event.dataTransfer.getData("application/nodeName");
            const nodeDesc = event.dataTransfer.getData("application/nodeDesc");
            const nodeColor = event.dataTransfer.getData("application/nodeColor");

            // check if the dropped element is valid
            if (typeof type === "undefined" || !type) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            console.log("event", event);
            const newNode = {
                id: nodeId,
                type,
                position,
                data: { title: nodeName, desc: nodeDesc },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition]
    );

    const onPaneClick = () => {
        setSelectedData(null);
    };

    const onNodeClick = (_, r) => {
        console.log("e", r);
        setSelectedData({
            clicked: "node",
            click_name: "상태",
            click_desc: "상태는 작업 과정의 단계를 캡처합니다.",
            ...r,
        });
    };

    const onEdgeClick = (_, r) => {
        console.log("data", r);
        setSelectedData({
            clicked: "edges",
            click_name: "전환",
            click_desc: "전환은 흐름을 통해 업무를 이동하는 작업으로 상태를 연결합니다.",
            ...r,
        });
    };

    return (
        <>
            <Button onClick={() => console.log({ nodes: nodes, edge: edges })}>데이터 확인</Button>
            <div className="dndflow" style={{ height: "calc(100% - 57px)" }}>
                <Sidebar />
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        edgeTypes={edgeTypes}
                        nodeTypes={nodeTypes}
                        defaultEdgeOptions={defaultEdgeOptions}
                        snapToGrid={true}
                        snapGrid={[25, 25]}
                        zoomOnScroll={false}
                        deleteKeyCode={["Delete", "BackSpace"]}
                        onPaneClick={onPaneClick}
                        // onNodeContextMenu={onNodeContextMenu}
                        onNodeClick={onNodeClick}
                        onEdgeClick={onEdgeClick}
                    >
                        <Controls />
                        <Background />
                    </ReactFlow>
                    {/* {menu && <ContextMenu onClick={onPaneClick} {...menu} />} */}
                </div>
                <Detailbar detail={selectedData} />
            </div>
        </>
    );
};

export default () => (
    <ReactFlowProvider>
        <DnDFlow />
    </ReactFlowProvider>
);
