//External Libraries
import React from "react";

//Components
import { Stage } from "./components/Stage/Stage";

//Hooks and Functions
import { coordinates, connections, nodes, nodeTypes, portTypes } from "./types";
import { NewNodeSidebar } from "./components/Sidebar/NewNodeSidebar";
import { NodeEditingSidebar } from "./components/Sidebar/NodeEditingSidebar";
import { styled } from "utils/stitches.config";

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
    position: {
      /**
       * The current zoom level.
       */
      zoom: number;
      /**
       * The current position of the Editor.
       */
      coordinates: coordinates;
    };
    /**
     * The currently shown Nodes.
     */
    nodes: nodes;
    /**
     * The currently shown Nodes.
     */
    connections: connections;
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

export const NodeEditor: React.FC<NodeEditorProps> = ({
  tree,
  disableZoom = false,
  disablePan = false,
}) => {
  return (
    <Container>
      <Stage
        disablePan={disablePan}
        disableZoom={disableZoom}
        style={{ gridColumn: "1 / -1", gridRow: "1" }}
        tree={tree}
      />
      <NewNodeSidebar
        css={{
          gridColumn: "1 / 2",
          gridRow: "1",
          overflowY: "auto",
        }}
      />
      <NodeEditingSidebar
        css={{
          gridColumn: "3 / 4",
          gridRow: "1",
          overflowY: "auto",
        }}
      />
    </Container>
  );
};
