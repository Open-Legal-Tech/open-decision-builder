import { MainContent } from "components";
import { Builder } from "features";
import React from "react";

export default function Tree() {
  return (
    <MainContent
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
      }}
    >
      <Builder />
    </MainContent>
  );
}
