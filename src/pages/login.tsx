import { MainContent } from "components";
import { LoginCard } from "features";
import React from "react";

export default function Login() {
  return (
    <MainContent
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginCard />
    </MainContent>
  );
}
