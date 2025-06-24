import React from "react";
import MainLayout from "./MainLayout";
import SettingsSidebar from "./SettingsSidebar";
import ProfileSettings from "./ProfileSettings"; 

export default function Settings() {
  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row gap-6">
        <SettingsSidebar />
        <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
          <ProfileSettings />
          {/* Later swap based on routing or tab state */}
        </div>
      </div>
    </MainLayout>
  );
}
