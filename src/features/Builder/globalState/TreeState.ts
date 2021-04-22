import produce from "immer";
import { devtools } from "zustand/middleware";
import create from "zustand";
import { Tree } from "../NodeEditor";
import {
  addEdge,
  Connection,
  Edge,
  Elements,
  Node,
  removeElements,
} from "react-flow-renderer";

type Methods = {
  setInitialState: (tree: Tree) => void;
  setNode: (node: Partial<Node> & Required<Pick<Node, "id">>) => void;
  addNode: (node: Node) => void;
  removeElements: (elementsToRemove: Elements) => void;
  addEdge: (connection: Edge<any> | Connection) => void;
};

export type TreeState = { tree: Tree } & Methods;

export const useTreeStore = create<TreeState>(
  devtools(
    (set) => ({
      tree: {
        config: { nodeTypes: {}, portTypes: {} },
        state: { elements: [], treeName: "" },
      },
      setInitialState: (tree) =>
        set(
          produce((state: TreeState) => {
            state.tree = tree;
          })
        ),
      setNode: (node) =>
        set(
          produce((state: TreeState) => {
            const elementIndex = state.tree.state.elements.findIndex(
              (element) => element.id === node.id
            );

            state.tree.state.elements[elementIndex] = {
              ...state.tree.state.elements[elementIndex],
              ...node,
            };
          })
        ),
      addNode: (node) =>
        set(
          produce((state: TreeState) => {
            state.tree.state.elements.push(node);
          })
        ),
      removeElements: (elementsToRemove) =>
        set((state) => {
          removeElements(elementsToRemove, state.tree.state.elements);
        }),
      addEdge: (connection) =>
        set(
          produce((state: TreeState) => {
            state.tree.state.elements = addEdge(
              connection,
              state.tree.state.elements
            );
          })
        ),
    }),
    "Tree"
  )
);
