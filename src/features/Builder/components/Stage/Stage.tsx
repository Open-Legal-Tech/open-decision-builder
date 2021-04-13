import { Tree } from "features/Builder";
import { useEditorStore, useTreeStore } from "features/Builder/globalState";
import React from "react";
import { useGesture } from "react-use-gesture";
import { CSS, styled } from "utils/stitches.config";
import shallow from "zustand/shallow";
import { ExistingConnection } from "../Connections/ExisitingConnection";
import { Node } from "../Node/Node";

const StageContainer = styled("div", {
  overflow: "hidden",
  outline: "none",
  backgroundColor: "#ffffff",
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpolygon fill-rule='evenodd' points='8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4'/%3E%3C/g%3E%3C/svg%3E\")",
});

type StageProps = {
  tree: Tree;
  /**
   * Setting this to false disables panning in the Editor.
   */
  disablePan: boolean;
  /**
   * Setting this to false disables zooming in the Editor.
   */
  disableZoom: boolean;
  className?: string;
  css?: CSS;
};

type Stage = React.FC<React.HTMLAttributes<HTMLDivElement> & StageProps>;

/**
 * The Stage is the main parent component of the node-editor. It holds all the Nodes and Connections pased in as children. It's main pourpose is to allow panning and zooming.
 */
export const Stage: Stage = ({ tree, disablePan, disableZoom, ...props }) => {
  const [setCoordinates, setZoom, zoom, coordinates] = useEditorStore(
    (state) => [
      state.setCoordinates,
      state.setZoom,
      state.zoom,
      state.coordinates,
    ],
    shallow
  );

  const [setInitialState, nodes, connections, nodeTypes] = useTreeStore(
    (state) => [
      state.setInitialState,
      state.data.nodes,
      state.data.connections,
      state.data.nodeTypes,
    ],
    shallow
  );

  React.useEffect(() => {
    setZoom(tree.state.position.zoom);
    setCoordinates(tree.state.position.coordinates);
    setInitialState({
      nodes: tree.state.nodes,
      nodeTypes: tree.config.nodeTypes,
      portTypes: tree.config.portTypes,
      connections: tree.state.connections,
    });
  }, [setCoordinates, setInitialState, setZoom, tree]);

  /**
   * These gestures represent the panning and zooming inside the Stage. They are enabled and disabled by the `disableZoom` and `disablePan` props.
   */
  const stageGestures = useGesture(
    {
      // We track the mousewheel and zoom in and out of the Stage.
      onWheel: ({ delta: [, y] }) => setZoom(y),
      // We track the drag and pan the Stage based on the previous coordinates and the delta (change) in the coordinates.
      onDrag: ({ movement, buttons, cancel }) => {
        //The panning should not work on right mouse click.
        const isValidClick = buttons === 1 || buttons === 4;

        // We cancel the event when the wrong button has been used. Otherwise we perform the operation
        isValidClick ? setCoordinates(movement) : cancel();
      },
    },
    {
      wheel: { enabled: !disableZoom, axis: "y" },
      drag: { enabled: !disablePan, initial: coordinates },
    }
  );

  //------------------------------------------------------------------------

  return (
    <StageContainer tabIndex={-1} {...stageGestures()} {...props}>
      {/* This inner wrapper is used to translate the position of the content on pan. */}
      <div
        className="origin-center absolute left-1/2 top-1/2"
        style={{
          transform: `translate(${coordinates[0]}px, ${coordinates[1]}px)`,
        }}
      >
        {/* This inner wrapper is used to zoom.  */}
        <div className="absolute" style={{ transform: `scale(${zoom})` }}>
          <div className="absolute left-0 h-0">
            {Object.entries(connections).map(([outputNodeId, connections]) =>
              connections.map((id) => (
                <ExistingConnection
                  key={`${outputNodeId}-${id}`}
                  output={nodes[outputNodeId]}
                  input={nodes[id]}
                />
              ))
            )}
          </div>
          {Object.values(nodes).map((node) => (
            <Node node={node} config={nodeTypes[node.type]} key={node.id} />
          ))}
        </div>
      </div>
    </StageContainer>
  );
};
