import React from "react";
import { CSS, styled } from "utils/stitches.config";
import { useEditorStore, useTreeStore } from "../../globalState";
import { LeftSidebar } from "./LeftSidebar";
import { ToolbarNode } from "./ToolbarNode";
import { pick } from "remeda";
import { coordinates } from "../../types";
import { nanoid } from "nanoid/non-secure";
import shallow from "zustand/shallow";

const turnNumberIntoOpposite = (number: number) =>
  number > 0 ? -number : Math.abs(number);

const getCenterOfStage = (
  coordinates: coordinates,
  zoom: number
): coordinates => [
  turnNumberIntoOpposite(coordinates[0] / zoom),
  turnNumberIntoOpposite(coordinates[1] / zoom),
];

const NodeList = styled("div", { display: "grid", gap: "$4" });

type NewNodeSidebarProps = { css?: CSS };

export const NewNodeSidebar: React.FC<NewNodeSidebarProps> = ({ css }) => {
  const [nodeTypes, addNode] = useTreeStore(
    (state) => [state.data.nodeTypes, state.addNode],
    shallow
  );
  const options = Object.values(nodeTypes).map((nodeType) =>
    pick(nodeType, ["label", "color", "type", "width"])
  );

  const [stageCoordinates, zoom] = useEditorStore((state) => [
    state.coordinates,
    state.zoom,
  ]);

  const centerOfStage = getCenterOfStage(stageCoordinates, zoom);

  return (
    <LeftSidebar width={300} css={css} title="Neuen Knoten hinzufügen">
      <NodeList>
        {options.map((option) => (
          <ToolbarNode
            key={option.label}
            label={option.label}
            color={option.color}
            onClick={() =>
              addNode({
                type: option.type,
                coordinates: centerOfStage,
                id: nanoid(5),
              })
            }
          />
        ))}
      </NodeList>
    </LeftSidebar>
  );
};
