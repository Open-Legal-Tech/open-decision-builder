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
import { Elements, ReactFlowProvider, OnLoadParams } from "react-flow-renderer";
import { useTreeStore } from "./globalState";
import { nanoid } from "nanoid/non-secure";
import { Stage } from "./Stage";

const Container = styled("div", {
  display: "grid",
  gridTemplateColumns: "max-content 1fr max-content",
  flexGrow: 1,
});

export type ElementData = { label: string };

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
    elements: Elements<ElementData>;
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

  const openSidebar = useNodeEditingSidebarState((state) => state.openSidebar);

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

  const [isSidebarOpen, toggleSidebar] = useNodeEditingSidebarState((state) => [
    state.open,
    state.toggleSidebar,
  ]);

  useEffect(() => {
    setInitialState(tree);
  }, [tree, setInitialState]);

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("application/reactflow");

    if (reactFlowWrapper.current && reactFlowInstance && type) {
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

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
          <Stage
            elements={elements}
            onElementsRemove={removeElements}
            onConnect={addEdge}
            onDragOver={onDragOver}
            onDrop={onDrop}
            tree={tree}
            onLoad={setReactFlowInstance}
            onElementClick={(_, node) => openSidebar(node.id)}
            style={{ gridColumn: "1 / -1", gridRow: "1" }}
          />
        </div>
      </ReactFlowProvider>
    </Container>
  );
};
