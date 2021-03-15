import React from "react";
import { pick } from "remeda";
import { useNodesStore } from "../../globalState";
import { PlusOutline } from "@graywolfai/react-heroicons";
// import { coordinates } from "../../types";
// import { nanoid } from "nanoid/non-secure";
import { useNewNodeMenu } from "./useNewNodeMenu";
// import { Button } from "components";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { styled } from "utils/stitches.config";

type NewNodeMenuProps = {
  className?: string;
};

const StyledContent = styled(DropdownMenu.Content, {
  minWidth: 130,
  backgroundColor: "white",
  borderRadius: 6,
  padding: 5,
  boxShadow: "0px 5px 15px -5px hsla(206,22%,7%,.15)",
});
const StyledItem = styled(DropdownMenu.Item, {
  fontSize: 13,
  padding: "5px 10px",
  borderRadius: 3,
  cursor: "default",
  "&:focus": {
    outline: "none",
    backgroundColor: "dodgerblue",
    color: "white",
  },
});

const Trigger = styled(DropdownMenu.Trigger, {
  width: "$8",
});

export const NewNodeMenu: React.FC<NewNodeMenuProps> = ({ className }) => {
  const { coordinates, closeMenu: closeModal, nodeId, ref } = useNewNodeMenu();

  const nodeTypes = useNodesStore((state) => state.nodeTypes);
  const options = Object.values(nodeTypes).map((nodeType) =>
    pick(nodeType, ["label", "color", "type", "width"])
  );

  // const nodeCoordinates = useNodesStore(
  //   (state) => state.nodes[nodeId].coordinates
  // );

  return (
    <DropdownMenu.Root>
      <Trigger>
        <PlusOutline className="text-white w-full" />
      </Trigger>

      <StyledContent
      // className={clsx(
      //   "bg-gray-100 rounded shadow-2xl border-gray-300 border-2 min-w-max absolute z-50",
      //   className
      // )}
      // style={{ left: coordinates[0], top: coordinates[1] }}
      // ref={ref}
      >
        <DropdownMenu.Label className="text-lg border-b-2 border-gray-30 p-2">
          Neuen Knoten hinzufügen
        </DropdownMenu.Label>
        {/* <div className="pt-3 p-2 space-y-2"> */}
        {options.map((option) => (
          <DropdownMenu.Item
            key={option.label}
            // color={option.color}
            // nodeType={option.type}
            // coordinates={nodeCoordinates}
            // width={option.width}
            // close={closeModal}
            // nodeId={nodeId}
          >
            {option.label}
          </DropdownMenu.Item>
        ))}
        {/* </div> */}
      </StyledContent>
    </DropdownMenu.Root>
  );
};

// type MenuEntry = React.FC<
//   React.ButtonHTMLAttributes<HTMLButtonElement> & {
//     className?: string;
//     coordinates: coordinates;
//     color?: string;
//     nodeType: string;
//     width: number;
//     close: () => void;
//     nodeId: string;
//   }
// >;

// const MenuEntry: MenuEntry = ({
//   children,
//   color,
//   nodeType,
//   coordinates,
//   width,
//   close,
//   nodeId,
//   ...props
// }) => {
//   const addNode = useNodesStore((state) => state.addNode);
//   const addEdge = useEdgesStore((state) => state.addEdge);

//   const newNodeCoordinates: coordinates = [
//     coordinates[0] + width + 150,
//     coordinates[1],
//   ];

//   return (
//     <Button
//       {...props}
//       variant="ghost"
//       className="min-w-max w-full flex justify-start p-1 items-center rounded"
//       onClick={() => {
//         close();
//         const newNodeId = nanoid(5);
//         addNode(nodeType, newNodeCoordinates, newNodeId);
//         addEdge(nodeId, newNodeId);
//       }}
//     >
//       <NewspaperOutline className="h-4 w-4 mr-2" style={{ color: color }} />
//       {children}
//     </Button>
//   );
// };
