import React, { useState, useEffect } from "react";
import MainLayout from "../../admin-panel/MainLayout";
import SettingsSidebar from "../../features/settings/SettingsSidebar";
import ProfileSettings from "../../features/settings/ProfileSettings";
import GovernanceSettings from "../../features/settings/GovernanceSettings";
import useAuthStore from "../../store/useAuthStore";
import UserManagementDashboard from "../../features/settings/UserManagementDashboard";

export default function Settings() {
  const { currentUser } = useAuthStore();

  // Options: 'profile' | 'account' | 'security' | 'governance'
  const [activeTab, setActiveTab] = useState("profile");

  // Security fallback gate logic: if a standard client tries to force route
  useEffect(() => {
    // Only intercept if we explicitly hit a forbidden tab and role calculation is complete
    if (
      activeTab === "governance" &&
      currentUser &&
      currentUser.role !== "admin"
    ) {
      setActiveTab("profile");
    }
  }, [activeTab, currentUser?.role]);

  const renderActiveView = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;
      case "governance":
        // Double-check user role block to prevent UI leaks
        return currentUser?.role === "admin" ? (
          <GovernanceSettings />
        ) : (
          <ProfileSettings />
        );
      case "account":
        return (
          <div className="py-12 text-center text-slate-400 font-mono text-xs uppercase tracking-widest">
            Account metrics system offline.
          </div>
        );
      case "security":
        return (
          <div className="py-12 text-center text-slate-400 font-mono text-xs uppercase tracking-widest">
            Security parameters terminal locked.
          </div>
        );
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter">
            System Preferences
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Configure your personal workspace identity, credentials, and
            platform infrastructure.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* We pass the verified user down to the sidebar to selectively render tabs */}
          <SettingsSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userRole={currentUser?.role}
          />

          <div className="flex-1 w-full bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 shadow-sm">
            {renderActiveView()}
          </div>
        </div>
        <div>
          <UserManagementDashboard />
        </div>
      </div>
    </MainLayout>
  );
}
