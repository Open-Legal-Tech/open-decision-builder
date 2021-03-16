import React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useEditorStore, useNodesStore } from "../../globalState";
import { pick } from "remeda";
import { ToolbarNode } from "./ToolbarNode";
import { nanoid } from "nanoid/non-secure";
import { coordinates } from "../../types";
import { CSS, styled, keyframes } from "utils/stitches.config";
import { ChevronRightOutline } from "@graywolfai/react-heroicons";

const turnNumberIntoOpposite = (number: number) =>
  number > 0 ? -number : Math.abs(number);

const getCenterOfStage = (
  coordinates: coordinates,
  zoom: number
): coordinates => [
  turnNumberIntoOpposite(coordinates[0] / zoom),
  turnNumberIntoOpposite(coordinates[1] / zoom),
];

const ToolbarRoot = styled(Collapsible.Root, {
  display: "grid",
  gridTemplateColumns: "max-content 1fr",
});

const ToolbarContent = styled(Collapsible.Content, {
  gridColumn: "1",
  backgroundColor: "white",
  width: "400px",
  padding: "$4",
  height: "100%",
});

const rotateLeft = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(180deg)" },
});

const rotateRight = keyframes({
  from: { transform: "rotate(180deg)" },
  to: { transform: "rotate(0deg)" },
});

const ToolbarToogle = styled(Collapsible.Button, {
  gridColumn: "2",
  margin: "$4",
  width: "40px",
  height: "40px",
  padding: "$1",
  borderRadius: "$md",
  backgroundColor: "$warmGray200",
  animation: `${rotateRight} 200ms`,

  '&[data-state="open"]': {
    animation: `${rotateLeft} 200ms`,
    animationFillMode: "forwards",
  },
});

type NewNodeToolbarProps = React.HTMLAttributes<HTMLDivElement> & {
  css?: CSS;
};

export const NewNodeToolbar: React.FC<NewNodeToolbarProps> = ({ css }) => {
  const nodeTypes = useNodesStore((state) => state.nodeTypes);
  const options = Object.values(nodeTypes).map((nodeType) =>
    pick(nodeType, ["label", "color", "type", "width"])
  );

  const addNode = useNodesStore((state) => state.addNode);
  const [stageCoordinates, zoom] = useEditorStore((state) => [
    state.coordinates,
    state.zoom,
  ]);
  const centerOfStage = getCenterOfStage(stageCoordinates, zoom);

  return (
    <ToolbarRoot css={css}>
      <ToolbarContent>
        {options.map((option) => (
          <ToolbarNode
            key={option.label}
            label={option.label}
            color={option.color}
            onClick={() => addNode(option.type, centerOfStage, nanoid(5))}
          />
        ))}
      </ToolbarContent>
      <ToolbarToogle>
        <ChevronRightOutline />
      </ToolbarToogle>
    </ToolbarRoot>
  );
};
