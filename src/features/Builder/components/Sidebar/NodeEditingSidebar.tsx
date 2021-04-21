import React from "react";
import { useTreeStore } from "../../globalState";
import create from "zustand";
import shallow from "zustand/shallow";
import { nodeTypes } from "features/Builder/types";

type SidebarState = {
  open: boolean;
  nodeId: string;
  toggleSidebar: (boolean?: boolean) => void;
  openSidebar: (nodeId: string) => void;
  closeSidebar: () => void;
};

export const useNodeEditingSidebarState = create<SidebarState>((set) => ({
  open: false,
  nodeId: "",
  toggleSidebar: (boolean) => {
    set((state) => ({ open: boolean !== undefined ? boolean : !state.open }));
  },
  openSidebar: (nodeId) => set({ open: true, nodeId }),
  closeSidebar: () => set({ open: false, nodeId: "" }),
}));

export const NodeEditingSidebar = (): JSX.Element => {
  const [nodeId] = useNodeEditingSidebarState((state) => [state.nodeId]);

  const [node, setNode] = useTreeStore(
    (state) => [
      state.tree.state.elements.find((element) => element.id === nodeId),
      state.setNode,
    ],
    shallow
  );

  return node?.data ? (
    <>
      <header className="flex justify-between items-stretch space-x-4">
        <input
          className="text-xl font-semibold border-b-4 pb-1 bg-gray-100 flex-1"
          value={node.data.label}
          onChange={(event) =>
            setNode({ id: nodeId, data: { label: event.target.value } })
          }
          maxLength={30}
        />
      </header>
      <section className="space-y-2">
        <h3 className="text-lg font-semibold">Unused Inputs</h3>
        <div className="w-full h-52 bg-gray-300 flex items-center justify-center text-xl">
          Filler
        </div>
      </section>
      <section className="space-y-2">
        <h3 className="text-lg font-semibold">Conditions</h3>
        <div className="w-full h-52 bg-gray-300 flex items-center justify-center text-xl">
          Filler
        </div>
      </section>
      <section className="space-y-2">
        <h3 className="text-lg font-semibold">Question</h3>
        <div className="w-full h-52 bg-gray-300 flex items-center justify-center text-xl">
          Filler
        </div>
      </section>
      <section className="space-y-2">
        <h3 className="text-lg font-semibold">Answers</h3>
        <div className="w-full h-52 bg-gray-300 flex items-center justify-center text-xl">
          Filler
        </div>
      </section>
    </>
  ) : (
    <p>Bitte wähle einen Knoten aus</p>
  );
};
