import React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useEditorStore, useNodesStore } from "../../globalState";
import { pick } from "remeda";
import { ToolbarNode } from "./ToolbarNode";
import { nanoid } from "nanoid/non-secure";
import { coordinates } from "../../types";
import { CSS, styled } from "utils/stitches.config";
import { ChevronDownSolid } from "@graywolfai/react-heroicons";
import { motion } from "framer-motion";
import { Tooltip } from "components";
import { useKeyPressEvent } from "react-use";

const turnNumberIntoOpposite = (number: number) =>
  number > 0 ? -number : Math.abs(number);

const getCenterOfStage = (
  coordinates: coordinates,
  zoom: number
): coordinates => [
  turnNumberIntoOpposite(coordinates[0] / zoom),
  turnNumberIntoOpposite(coordinates[1] / zoom),
];

const Root = styled(Collapsible.Root, {});

const AnimationContainer = styled(motion.div, {
  height: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(2, max-content)",
});

const Content = styled(Collapsible.Content, {
  gridColumn: "1",
  backgroundColor: "white",
  width: "300px",
  padding: "$4",
  height: "100%",
  boxShadow: "$xl",
});

const Toggle = styled(Collapsible.Button, {
  gridColumn: "2",
  margin: "$4",
  width: "40px",
  height: "40px",
  padding: "$1",
  borderRadius: "$md",
  backgroundColor: "$warmGray200",
});

const Header = styled("h2", {
  fontSize: "$md",
  color: "$gray600",
  fontWeight: "$semibold",
});

const NodeList = styled("div", { display: "grid", gap: "$4" });

const sidebarAnimationVariants = {
  open: { x: 0 },
  closed: { x: "-80%" },
};

const arrowAnimationVariants = {
  open: { rotate: 90 },
  closed: { rotate: -90 },
};

type NewNodeToolbarProps = React.HTMLAttributes<HTMLDivElement> & {
  css?: CSS;
};

export const NewNodeToolbar: React.FC<NewNodeToolbarProps> = ({ css }) => {
  const [open, setOpen] = React.useState(false);
  useKeyPressEvent("Escape", () => setOpen(false));

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
    <Root css={css} open={open} onOpenChange={() => setOpen(!open)}>
      <AnimationContainer
        animate={open ? "open" : "closed"}
        initial="closed"
        variants={sidebarAnimationVariants}
        transition={{ duration: 0.3 }}
      >
        <Content forceMount>
          <Header css={{ marginBottom: "$4" }}>Neuen Knoten hinzufügen</Header>
          <NodeList>
            {options.map((option) => (
              <ToolbarNode
                key={option.label}
                label={option.label}
                color={option.color}
                onClick={() => addNode(option.type, centerOfStage, nanoid(5))}
              />
            ))}
          </NodeList>
        </Content>
        <Tooltip content="Neuen Knoten hinzufügen" side="right">
          <Toggle>
            <motion.div
              variants={arrowAnimationVariants}
              animate={open ? "open" : "closed"}
              initial="closed"
            >
              <ChevronDownSolid />
            </motion.div>
          </Toggle>
        </Tooltip>
      </AnimationContainer>
    </Root>
  );
};
