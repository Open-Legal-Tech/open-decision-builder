import React from "react";
import { NodeEditor, Nodes } from "flume";
import config from "./config";
import { Button, FileInput, Link } from "@components/index";
import { ChevronRightOutline } from "@graywolfai/react-heroicons";

const Editor: React.FC<{ initialNodes?: any; setNodes?: any }> = ({
  initialNodes,
  setNodes,
}) => {
  return (
    <NodeEditor
      portTypes={config.portTypes}
      nodeTypes={config.nodeTypes}
      nodes={initialNodes}
      onChange={setNodes}
    />
  );
};

export const Builder = () => {
  const [nodes, setNodes] = React.useState<undefined | Nodes>();
  let fileReader: FileReader;

  const handleFileRead = () =>
    setNodes(JSON.parse(fileReader.result as string));

  const handleFileChosen = (file: File) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <div className="relative" style={{ backgroundColor: "#1a1c1d" }}>
      {nodes ? (
        <>
          <div className="absolute p-5 z-20 space-x-6 flex">
            <Link
              variant="button"
              download="decision_tree.json"
              href={`data:application/json,${JSON.stringify(
                nodes,
                null,
                "\t"
              )}`}
            >
              Export
            </Link>

            <Button
              onClick={() => {
                setNodes(undefined);
              }}
            >
              Reset
            </Button>
          </div>
          <Editor initialNodes={nodes} setNodes={setNodes} />
        </>
      ) : (
        <div className="text-white h-full w-full flex justify-center items-center flex-col">
          <div>
            <h1 className="text-5xl">Starte mit Testen</h1>
            <p className="mt-6 text-xl">
              Um den Builder auszuprobieren klicke auf{" "}
              <Button onClick={() => setNodes({})} className="mx-2">
                <ChevronRightOutline className="w-6" />
                Starten
              </Button>
            </p>
            <p className="text-xl mt-6">
              Alternativ kann ein bestehender Datensatz importiert werden.
              <FileInput
                className="mt-4"
                name="file"
                accept=".json"
                onChange={(e) =>
                  e?.currentTarget?.files &&
                  handleFileChosen(e.currentTarget.files[0])
                }
              >
                Datei hochladen
              </FileInput>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
