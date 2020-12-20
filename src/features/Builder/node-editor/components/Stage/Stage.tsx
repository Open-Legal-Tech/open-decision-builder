import React from "react";
import styles from "./Stage.module.css";
import { Portal } from "react-portal";
import ContextMenu, { menuOption } from "../ContextMenu/ContextMenu";
import { EditorContext, STAGE_ID } from "../../utilities";
import orderBy from "lodash/orderBy";
import clamp from "lodash/clamp";
import { coordinates } from "../../types";
import { useKeyPressEvent, useMouseWheel } from "react-use";
import { useConditionalEffect } from "../../hooks/useConditionalEffect";
import { useDrag } from "../../hooks/useDrag";

type StageProps = {
  stageRect: React.MutableRefObject<DOMRect | null>;
  /**
   * Setting this to false disables panning in the Editor.
   */
  disablePan: boolean;
  /**
   * Setting this to false disables zooming in the Editor.
   */
  disableZoom: boolean;
};

/**
 * The Stage is the main parent component of the node-editor. It holds all the Nodes and Connections. It is pannable and zoomable.
 */
export const Stage: React.FC<StageProps> = ({
  children,
  stageRect,
  disablePan,
  disableZoom,
}) => {
  //We need information from the editorState to render the Stage. For the main functionality of the Stage, namely zooming and panning, we also need the dispatch function to update the zoom and position state variables.
  const [
    {
      zoom,
      position,
      id,
      config: [nodeTypes],
    },
    dispatch,
  ] = React.useContext(EditorContext);

  /**
   * The wrapper is used as a ref for the main Box of the Stage. This allows the Stage to be imperatively modified without causing a rerender.
   */
  const wrapper = React.useRef<HTMLDivElement>(null);

  /**
   * This tracks the state of the ContextMenu.
   */
  const [menuOpen, setMenuOpen] = React.useState(false);
  /**
   * This tracks the Coordinates of the ContextMenu.
   */
  const [menuCoordinates, setMenuCoordinates] = React.useState<coordinates>({
    x: 0,
    y: 0,
  });

  /**
   * This tracks whether the space key is pressed. We need this, because the Stage should be pannable when pressing the space key.
   */
  const [spaceIsPressed, setSpaceIsPressed] = React.useState(false);
  useKeyPressEvent(
    "space",
    () => setSpaceIsPressed(true),
    () => setSpaceIsPressed(false)
  );

  /**
   * The mouseWheel is tracked.
   */
  const mouseWheel = useMouseWheel();

  /**
   * This hook runs a function when the condition is true. In this case we only want to set a zoom level when zoom is not disabled.
   */
  useConditionalEffect(
    () =>
      dispatch({
        type: "SET_SCALE",
        zoom: clamp(zoom - clamp(mouseWheel, -10, 10) * 0.005, 0.1, 7),
      }),
    !disableZoom
  );

  //------------------------------------------------------------------------
  //TODO understand what this does
  const setStageRect = React.useCallback(() => {
    stageRect.current = wrapper?.current?.getBoundingClientRect() ?? null;
  }, [stageRect]);

  React.useEffect(() => {
    stageRect.current = wrapper?.current?.getBoundingClientRect() ?? null;
    window.addEventListener("resize", setStageRect);
    return () => {
      window.removeEventListener("resize", setStageRect);
    };
  }, [setStageRect, stageRect]);

  //------------------------------------------------------------------------
  //The following functions are event handlers to handle the Drag lifecycle.
  const {
    coordinates,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useDrag(position);

  /**
   * Handles opening the ContextMenu.
   */
  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();

    setMenuCoordinates({ x: e.clientX, y: e.clientY });
    setMenuOpen(true);
    return false;
  };

  /**
   * Interpolates a value with the zoom level. This is used to make the positional values relative to the zoom level and just to the actual values reported by the a drag event.
   */
  const byScale = (value: number) => (1 / zoom) * value;

  /**
   * Uses the ref of the outer box to calculate coordinates for elements.
   */
  const getCoordinates = () => {
    const wrapperRect = wrapper?.current?.getBoundingClientRect();

    if (wrapperRect) {
      const x =
        byScale(menuCoordinates.x - wrapperRect.x - wrapperRect.width / 2) +
        byScale(position.x);

      const y =
        byScale(menuCoordinates.y - wrapperRect.y - wrapperRect.height / 2) +
        byScale(position.y);

      return { x, y };
    }
  };

  /**
   * Can be called to add a new Node.
   * @param type - The type of Node that should be added.
   */
  const addNode = (type: string) => {
    const coordinates = getCoordinates();

    coordinates
      ? dispatch({
          type: "ADD_NODE",
          nodeType: type,
          ...coordinates,
        })
      : null;
  };

  /**
   * Can be called to add a new Comment.
   */
  const addComment = () => {
    const coordinates = getCoordinates();

    coordinates
      ? dispatch({
          type: "ADD_COMMENT",
          ...coordinates,
        })
      : null;
  };

  /**
   * Handles the different kinds of elements that can be added to the Editor.
   */
  const addElement = (menuOption: menuOption) => {
    switch (menuOption.internalType) {
      case "comment":
        addComment();
        break;

      case "node":
        addNode(menuOption.type);
        break;

      default:
        break;
    }
  };

  /**
   * The menuOptions are filling the ContextMenu with the nodes that are addable to the Editor. They are sorted based on sortIndex and label.
   */
  const menuOptions = React.useMemo(() => {
    const options = orderBy(
      Object.values(nodeTypes).map(
        (node): menuOption => ({
          type: node.type,
          label: node.label,
          description: node.description,
          sortPriority: node.sortPriority,
          internalType: "node",
        })
      ),
      ["sortIndex", "label"]
    );

    return options;
  }, [nodeTypes]);

  return (
    // A Draggable component is providing the main Stage Container.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      id={`${STAGE_ID}${id}`}
      className={styles.wrapper}
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseMove}
      onMouseUp={handleMouseUp}
      tabIndex={-1}
      style={{ cursor: spaceIsPressed ? "grab" : "" }}
    >
      {/* Here we track whether the ContextMenu should be open or closed. When we open the menu the coordinates are set based on the position of the mouse click. */}
      {menuOpen ? (
        <Portal>
          <ContextMenu
            x={menuCoordinates.x}
            y={menuCoordinates.y}
            options={menuOptions}
            onRequestClose={() => setMenuOpen(false)}
            onOptionSelected={addElement}
            label="Add Node"
          />
        </Portal>
      ) : null}
      {/* This inner wrapper is used to translate the position of the content on pan. */}
      <div
        className={styles.transformWrapper}
        style={{
          transform: `translate(${-coordinates.x}px, ${-coordinates.y}px)`,
        }}
      >
        {/* This inner wrapper is used to zoom.  */}
        <div
          className={styles.scaleWrapper}
          style={{ transform: `scale(${zoom})` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
