import React from "react";
import { Comments, NodeEditor, Nodes } from "flume";
import config from "./config";
import { Button, FileInput, Header, Link } from "@components/index";
import { ChevronRightOutline } from "@graywolfai/react-heroicons";
import { useFileReader } from "@utils/index";

type EditorState = {
  nodes: Nodes;
  comments: Comments;
};

const Editor: React.FC<{
  initialData?: EditorState;
  setNodes?: any;
  setComments?: any;
}> = ({ initialData = { nodes: {}, comments: {} }, setNodes, setComments }) => {
  console.log(config);
  return (
    <NodeEditor
      portTypes={config.portTypes}
      nodeTypes={config.nodeTypes}
      nodes={initialData.nodes}
      onChange={setNodes}
      comments={initialData.comments}
      onCommentsChange={setComments}
    />
  );
};

export const Builder: React.FC = () => {
  const [data, setData, setFile] = useFileReader<EditorState>();

  return (
    <>
      <Header />
      <div className="relative" style={{ backgroundColor: "#1a1c1d" }}>
        {data?.nodes ? (
          <>
            <div className="absolute p-5 z-20 space-x-6 flex">
              <Link
                variant="button"
                download="decision_tree.json"
                href={`data:application/json,${JSON.stringify(
                  data,
                  null,
                  "\t"
                )}`}
              >
                Export
              </Link>

              <Button
                onClick={() => {
                  setData(undefined);
                }}
              >
                Reset
              </Button>
            </div>
            <Editor
              initialData={data}
              setNodes={(value: Nodes) => setData({ ...data, nodes: value })}
              setComments={(value: Comments) =>
                setData({ ...data, comments: value })
              }
            />
          </>
        ) : (
          <div className="text-white h-full w-full flex justify-center items-center flex-col">
            <div>
              <h1 className="text-5xl">Starte mit Testen!</h1>
              <p className="mt-6 text-xl">
                Um den Builder auszuprobieren klicke auf{" "}
                <Button
                  onClick={() => setData({ nodes: {}, comments: {} })}
                  className="mx-2"
                >
                  <ChevronRightOutline className="w-6" />
                  Starten
                </Button>
              </p>
              <p className="text-lg mt-12">
                Alternativ kann ein bestehender Datensatz importiert werden.
                <FileInput
                  className="mt-4"
                  name="file"
                  accept=".json"
                  onChange={setFile}
                >
                  Datei hochladen
                </FileInput>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
