import React from "react";
import { PlusCircleOutline } from "@graywolfai/react-heroicons";
import {
  useAll_TreesQuery,
  useCreate_TreeMutation,
  useUserQuery,
} from "internalTypes";
import { TreeList } from "./TreeList";
import { validateTreeData } from "./dataValidation";
import { Button } from "components";
import { useQueryClient } from "react-query";

export const Dashboard: React.FunctionComponent = () => {
  const user = useUserQuery();
  const allTrees = useAll_TreesQuery({}, { select: validateTreeData });

  const queryClient = useQueryClient();
  const createTreeMutation = useCreate_TreeMutation({
    onSuccess: () => queryClient.invalidateQueries("ALL_TREES"),
  });

  return (
    <div className="dashboard-grid">
      <div className="col-start-2 mt-24 mx-4 md:mx-8 flex flex-col justify-end items-start">
        <h2 className="text-5xl mb-6">
          Hallo {user.data?.me?.username ?? "Dirk Lawyer"}
        </h2>
        <Button
          outlined
          className="my-8"
          size="xLarge"
          onClick={() =>
            createTreeMutation.mutate({ input: { name: "Hallo Max" } })
          }
        >
          <PlusCircleOutline className="w-8 mr-2 inline" />
          Neue Anwendung erstellen
        </Button>
      </div>

      <div className="col-start-2 row-start-2 mx-4 md:mx-8">
        {allTrees.isError ? (
          <span>Error :(</span>
        ) : allTrees.isLoading ? (
          <span>Laden</span>
        ) : allTrees.isSuccess ? (
          <TreeList data={allTrees.data.validData} />
        ) : null}
      </div>
    </div>
  );
};
