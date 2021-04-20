import { useService } from "@xstate/react";
import { MainContent } from "components";
import { authService, NodeEditor, Tree as TreeType } from "features";
import {
  exampleConnections,
  exampleNodes,
  exampleNodeTypes,
  examplePortTypes,
} from "features/Builder/tests/nodes";
import { useTreeQuery } from "internalTypes";
import { useRouter } from "next/router";
import { useState } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "react-flow-renderer";

const initialElements = [
  {
    id: "1",
    type: "input", // input node
    data: { label: "Input Node" },
    position: { x: 250, y: 25 },
  },
  // default node
  {
    id: "2",
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    type: "output", // output node
    data: { label: "Output Node" },
    position: { x: 250, y: 250 },
  },
  // animated edge
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3" },
];

export default function Tree() {
  const [state] = useService(authService);
  const router = useRouter();

  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  const tree = useTreeQuery<TreeType>(
    state.context.client,
    { id: router.query.id as string },
    {
      select: ({ decisionTree }) => ({
        config: { nodeTypes: exampleNodeTypes, portTypes: examplePortTypes },
        state: {
          position: { zoom: 1, coordinates: [0, 0] },
          treeName: decisionTree?.name ?? "",
          nodes: exampleNodes,
          connections: exampleConnections,
        },
      }),
    }
  );

  return (
    <MainContent css={{ overflow: "hidden" }}>
      {/* {tree.isSuccess && <NodeEditor tree={tree.data} />} */}
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        deleteKeyCode={46}
      >
        <Background variant="lines" gap={12} size={1} />
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
    </MainContent>
  );
}
