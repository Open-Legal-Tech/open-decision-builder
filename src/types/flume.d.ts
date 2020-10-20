declare module "flume" {
  export enum Colors {
    yellow,
    orange,
    red,
    pink,
    purple,
    blue,
    green,
    grey,
  }

  interface PortType {
    type: string;
    name: string;
    label?: string;
    acceptTypes?: string[];
    color: Colors;
    hidePort?: boolean;
    controls?: Control[];
  }

  interface BaseControlConfig {
    name: string;
    label: string;
    defaultValue?: string;
    setValue?: (oldData: any, newData: any) => any;
  }

  interface TextControlConfig extends BaseControlConfig {
    placeholder?: string;
  }

  interface SelectControlConfig extends BaseControlConfig {
    options: { value: string; label: string; description?: string }[];
  }

  interface NumberControlConfig extends BaseControlConfig {
    step?: number;
  }

  interface CustomControlConfig extends BaseControlConfig {
    render: (
      data: any,
      onChange: (data: any) => void,
      context: any,
      redraw: () => void,
      portProps: PortProps,
      inputData: any
    ) => JSX.Element;
  }

  type Control = {
    type: string;
    label: string;
    name: string;
    defaultValue: string;
    setValue: (oldData: any, newData: any) => any;
  };

  export namespace Controls {
    function text(config: TextControlConfig): Control;
    function select(config: SelectControlConfig): Control;
    function number(config: NumberControlConfig): Control;
    function checkbox(config: BaseControlConfig): Control;
    function multiselect(config: SelectControlConfig): Control;
    function custom(config: CustomControlConfig): Control;
  }

  interface PortBuilderType {
    type: string;
    name?: string;
    label?: string;
    noControls?: boolean;
    color?: string;
    hidePort?: boolean;
    controls?: boolean;
  }

  interface NodeType {
    type: string;
    label?: string;
    initialWidth?: number;
    inputs?: ((ports: any) => PortBuilderType[]) | PortBuilderType[];
    outputs?: ((ports: any) => PortBuilderType[]) | PortBuilderType[];
    root?: boolean;
    addable?: boolean;
    deletable?: boolean;
    description?: string;
    sortIndex?: number;
  }

  interface PortProps {
    label: string;
    inputLabel: string;
    name: string;
    portName: string;
    defaultValue: any;
    inputData: any;
  }

  interface NodeBase {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
  }

  interface Connection {
    nodeId: string;
    portName: string;
  }

  interface Node extends NodeBase {
    type: string;
    connections: {
      inputs: { [id: string]: Connection };
      outputs: { [id: string]: Connection };
    };
    inputData: {
      [id: string]: { string?: string; boolean?: boolean; number?: number };
    };
  }

  interface Comment extends NodeBase {
    text: string;
  }

  interface DefaultNode {
    type: string;
    x: number;
    y: number;
  }

  interface Nodes {
    [id: string]: Node;
  }

  interface Comments {
    [id: string]: Comment;
  }

  interface PortTypes {
    [id: string]: PortType;
  }

  interface NodeTypes {
    [id: string]: NodeType;
  }

  export function NodeEditor(
    {
      comments: initialComments,
      nodes: initialNodes,
      nodeTypes,
      portTypes,
      defaultNodes,
      context,
      onChange,
      onCommentsChange,
      initialScale,
      spaceToPan,
      hideComments,
      disableComments,
      disableZoom,
      disablePan,
      circularBehavior,
      debug,
    }: {
      comments?: Comments;
      nodes: Nodes;
      nodeTypes?: NodeTypes;
      portTypes?: PortTypes;
      defaultNodes?: DefaultNode[];
      context?: any;
      onChange?: Dispatch<(prevState: undefined) => undefined>;
      onCommentsChange?: (comments: Comments) => void;
      initialScale?: number;
      spaceToPan?: boolean;
      hideComments?: boolean;
      disableComments?: boolean;
      disableZoom?: boolean;
      disablePan?: boolean;
      circularBehavior?: "prevent" | "warn" | "allow";
      debug?: boolean;
    },
    ref: React.RefObject<unknown>
  ): JSX.Element;

  export class RootEngine {
    constructor(config: any, resolveInputControls: any, fireNodeFunction: any);
    config: any;
    fireNodeFunction: any;
    resolveInputControls: any;
    loops: number;
    maxLoops: number;
    resetLoops: (maxLoops: any) => void;
    checkLoops: () => void;
    getRootNode: (nodes: any) => any;
    reduceRootInputs: (inputs: any, callback: any) => Record<string, unknown>;
    resolveInputValues: (
      node: any,
      nodeType: any,
      nodes: any,
      context: any
    ) => any;
    getValueOfConnection: (connection: any, nodes: any, context: any) => any;
    resolveRootNode(nodes: any, options?: Record<string, unknown>): any;
  }

  export class FlumeConfig {
    constructor(config?: any);
    nodeTypes: NodeTypes;
    portTypes: PortTypes;
    addRootNodeType(config: NodeType): FlumeConfig;
    addNodeType(config: NodeType): FlumeConfig;
    removeNodeType(type: string): FlumeConfig;
    addPortType(config: PortType): FlumeConfig;
    removePortType(type: string): FlumeConfig;
  }

  export function useRootEngine(
    nodes: { [id: string]: Node },
    engine: any,
    context: any
  ): any;
}
