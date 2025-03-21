import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  const handleSaveSettings = () => {
    localStorage.setItem("emailNotifications", emailNotifications);
    localStorage.setItem("smsNotifications", smsNotifications);
    localStorage.setItem("twoFactorAuth", twoFactorAuth);

    alert("Settings saved successfully!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Profile</h2>
        {username && email && role ? (
          <div>
            <p>
              <strong>Username:</strong> {username}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Role:</strong> {role}
            </p>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
          Edit Profile
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
        <p className="mb-2">Change your account email or password.</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Change Email
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded ml-4">
          Change Password
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
        <p className="mb-2">Choose your notification preferences.</p>
        <label className="block mb-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
          />
          Receive email notifications
        </label>
        <label className="block mb-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={smsNotifications}
            onChange={(e) => setSmsNotifications(e.target.checked)}
          />
          Receive SMS notifications
        </label>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Security</h2>
        <p className="mb-2">Manage your security settings.</p>
        <label className="block mb-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={twoFactorAuth}
            onChange={(e) => setTwoFactorAuth(e.target.checked)}
          />
          Enable Two-Factor Authentication
        </label>
      </div>

      <div className="mb-6">
        <button
          onClick={handleSaveSettings}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save Settings
        </button>
      </div>

      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
