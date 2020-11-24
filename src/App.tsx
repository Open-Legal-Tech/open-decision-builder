import React from "react";
import { Switch, Route } from "react-router-dom";
import { Layout } from "@components/index";
import { Dashboard, ProtectedRoute, LoginCard, Builder } from "@features/index";
import "./index.css";

export const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/">
        <Layout>
          <Builder />
        </Layout>
      </Route>

      <ProtectedRoute path={["/", "/dashboard"]} exact>
        <Layout>
          <Dashboard />
        </Layout>
      </ProtectedRoute>

      <Route path="/login">
        <div className="flex justify-center items-center">
          <LoginCard />
        </div>
      </Route>
    </Switch>
  );
};
