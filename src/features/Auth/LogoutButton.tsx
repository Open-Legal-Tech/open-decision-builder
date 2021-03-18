import React from "react";
import { useNavigate } from "react-router-dom";
import { FunctionComponent } from "react";
import { Button } from "components";
import { useAuthMethods } from "./AuthContext";

export const LogoutButton: FunctionComponent<{ className?: string }> = ({
  className,
}) => {
  const { logout } = useAuthMethods();
  const navigate = useNavigate();

  //TODO handle Failure in UI
  return (
    <Button onClick={() => logout(() => navigate("/"))} className={className}>
      Logout
    </Button>
  );
};
