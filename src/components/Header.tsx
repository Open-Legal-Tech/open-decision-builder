import React from "react";
import { LogoutButton } from "@features/index";
import { Logo, Menu } from "@components/index";
import { useAuth } from "@features/Auth/AuthContext";

export const Header: React.FC = () => {
  const { token } = useAuth();

  return (
    <div className="bg-gray-200 px-4 md:px-8 py-4">
      <div className="flex justify-between items-center">
        <Logo />
        <div className="flex items-center space-x-8">
          <Menu
            icon={
              token
                ? "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
                : undefined
            }
            links={{
              dropdownLinks: [
                { to: "./profile", text: "Profil" },
                { to: "./settings", text: "Einstellungen" },
              ],
              dropdownButtons: <LogoutButton />,
            }}
          />
        </div>
      </div>
    </div>
  );
};
