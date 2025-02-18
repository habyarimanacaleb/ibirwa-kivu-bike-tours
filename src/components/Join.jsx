import React from "react";
import { useState } from "react";
import { Navbar } from "./Navbar";
import { SignIn } from "./SignIn";
import { CreateAccount } from "./CreateAccount";

export const Join = () => {
  const [currentView, setCurrentView] = useState("signin");

  const handleViewChange = (view) => {
    setCurrentView(view);
  };
  return (
    <div>
      <Navbar />
      {currentView === "signin" ? (
        <SignIn onSwitchToCreate={() => handleViewChange("create")} />
      ) : (
        <CreateAccount onSwitchToSignIn={() => handleViewChange("signin")} />
      )}
    </div>
  );
};
