import React from "react";
import { Switch, Route } from "react-router-dom";
import { Layout } from "components";
import { Builder, Dashboard, LoginCard, ProtectedRoute } from "features";
import "./index.css";

export const App: React.FC = () => {
  return (
    <Switch>
      <ProtectedRoute path={["/", "/dashboard"]} exact>
        <Layout>
          <Dashboard />
        </Layout>
      </ProtectedRoute>

      <Route path="/login">
        <div className="flex justify-center items-center h-screen">
          <LoginCard />
        </div>
      </Route>

      <Route path="/builder">
        <Layout>
          <Builder />
        </Layout>
      </Route>
    </Switch>
  );
};
