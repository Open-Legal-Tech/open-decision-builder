import { coordinates } from "@globalTypes/types";

type editorAction =
  | { type: "SET_SCALE"; scale: number }
  | { type: "SET_TRANSLATE"; translate: coordinates };

export type EditorState = {
  id: string;
  scale: number;
  translate: coordinates;
  executionContext: Record<string, unknown>;
};

export const editorReducer = (
  state: EditorState,
  incomingAction: editorAction | ((state: EditorState) => editorAction)
): EditorState => {
  const action =
    typeof incomingAction === "function"
      ? incomingAction(state)
      : incomingAction;

  switch (action.type) {
    case "SET_SCALE":
      return { ...state, scale: action.scale };
    case "SET_TRANSLATE":
      return { ...state, translate: action.translate };
    default:
      return state;
  }
};
