import React from "react";
import {
  AnimationContainer,
  SidebarProps,
  Content,
  Header,
  Toggle,
  SidebarRoot,
} from "./shared";
import { useKeyPressEvent } from "react-use";
import { ChevronDownSolid } from "@graywolfai/react-heroicons";
import { Tooltip } from "components";
import { motion } from "framer-motion";

const arrowAnimationVariants = {
  open: { rotate: -90 },
  closed: { rotate: 90 },
};

export const RightSidebar: React.FC<SidebarProps> = ({
  css,
  children,
  title,
  tooltip,
  width,
  open,
  onOpenChange,
}) => {
  // useKeyPressEvent("Escape", onOpenChange);

  const sidebarAnimationVariants = {
    open: { x: "0" },
    closed: { x: `${width}px` },
  };

  console.log(open);

  return (
    <SidebarRoot css={css} open={open} onOpenChange={onOpenChange}>
      <AnimationContainer
        animate={open ? "open" : "closed"}
        initial="closed"
        variants={sidebarAnimationVariants}
        transition={{ duration: 0.3 }}
      >
        <Tooltip content={tooltip ? tooltip : title} side="left">
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
        <Content css={{ width }} forceMount>
          <Header css={{ marginBottom: "$4" }}>{title}</Header>
          {children}
        </Content>
      </AnimationContainer>
    </SidebarRoot>
  );
};
