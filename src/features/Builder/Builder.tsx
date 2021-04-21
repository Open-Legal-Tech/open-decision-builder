//External Libraries
import React, { useEffect, useRef, useState } from "react";

//Hooks and Functions
import { portTypes, nodeTypes } from "./types";
import { NewNodeSidebar } from "./components/Sidebar/NewNodeSidebar";
import {
  NodeEditingSidebar,
  useNodeEditingSidebarState,
} from "./components/Sidebar/NodeEditingSidebar";
import { styled } from "utils/stitches.config";
import { LeftSidebar } from "./components/Sidebar/LeftSidebar";
import { RightSidebar } from "./components/Sidebar/RightSidebar";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Elements,
  ReactFlowProvider,
  BackgroundVariant,
  OnLoadParams,
} from "react-flow-renderer";
import { nanoid } from "nanoid/non-secure";
import { useTreeStore } from "./globalState";

const Container = styled("div", {
  display: "grid",
  gridTemplateColumns: "max-content 1fr max-content",
  flexGrow: 1,
});

export type Tree = {
  config: {
    /**
     * The preconfigured avaliable NodeTypes that are avaliable in the node-editor.
     */
    nodeTypes: nodeTypes;
    /**
     * The preconfigured avaliable NodeTypes that are avaliable in the node-editor.
     */
    portTypes: portTypes;
  };
  state: {
    treeName: string;
    elements: Elements<{ label: string }>;
  };
};

type NodeEditorProps = {
  /**
   * The id of the Tree.
   */
  tree: Tree;
  /**
   * Zooming can be disabled. False by default.
   */
  disableZoom?: boolean;
  /**
   * Panning can be disabled. False by default.
   */
  disablePan?: boolean;
};
export const NodeEditor: React.FC<NodeEditorProps> = ({ tree }) => {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const [
    reactFlowInstance,
    setReactFlowInstance,
  ] = useState<OnLoadParams<any> | null>(null);

  const [
    elements,
    setInitialState,
    addNode,
    addEdge,
    removeElements,
    nodeTypes,
  ] = useTreeStore((state) => [
    state.tree.state.elements,
    state.setInitialState,
    state.addNode,
    state.addEdge,
    state.removeElements,
    state.tree.config.nodeTypes,
  ]);

  useEffect(() => {
    setInitialState(tree);
  }, [tree, setInitialState]);

  const [
    isSidebarOpen,
    toggleSidebar,
    openSidebar,
  ] = useNodeEditingSidebarState((state) => [
    state.open,
    state.toggleSidebar,
    state.openSidebar,
  ]);

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (reactFlowWrapper.current && reactFlowInstance) {
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

      const type = event.dataTransfer.getData("application/reactflow");

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: nanoid(5),
        type,
        position,
        data: { label: `${type} node` },
      };

      addNode(newNode);
    }
  };

  console.log({ elements, nodeTypes });

  return (
    <Container>
      <ReactFlowProvider>
        <div
          className="w-screen h-full grid"
          style={{ grid: "inherit" }}
          ref={reactFlowWrapper}
        >
          <LeftSidebar
            css={{
              gridColumn: "1 / 2",
              gridRow: "1",
              overflowY: "auto",
              zIndex: 5,
            }}
            title="Neuen Knoten hinzufügen"
          >
            <NewNodeSidebar nodeTypes={nodeTypes} />
          </LeftSidebar>
          <RightSidebar
            css={{
              gridColumn: "3 / 4",
              gridRow: "1",
              overflowY: "auto",
              zIndex: 5,
            }}
            title="Knoten bearbeiten"
            open={isSidebarOpen}
            onOpenChange={toggleSidebar}
          >
            <NodeEditingSidebar />
          </RightSidebar>
          <ReactFlow
            elements={elements}
            onElementsRemove={removeElements}
            onConnect={addEdge}
            deleteKeyCode={46}
            onNodeDoubleClick={(event, node) => openSidebar(node.id)}
            onLoad={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            style={{ gridColumn: "1 / -1", gridRow: "1" }}
          >
            <Background variant={BackgroundVariant.Dots} gap={24} size={1} />
            <MiniMap
              nodeColor={(node) => {
                switch (node.type) {
                  case "input":
                    return "red";
                  case "default":
                    return "#00ff00";
                  case "output":
                    return "rgb(0,0,255)";
                  default:
                    return "#eee";
                }
              }}
              nodeStrokeWidth={3}
            />
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </Container>
  );
};
