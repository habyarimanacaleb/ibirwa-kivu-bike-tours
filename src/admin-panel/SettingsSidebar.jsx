import React from "react";
import { Link } from "react-router-dom"; // if using react-router

export default function SettingsSidebar() {
  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 p-4 bg-white border-r rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Settings</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/settings/profile" className="block px-4 py-2 rounded hover:bg-gray-100">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/settings/account" className="block px-4 py-2 rounded hover:bg-gray-100">
            Account
          </Link>
        </li>
        <li>
          <Link to="/settings/security" className="block px-4 py-2 rounded hover:bg-gray-100">
            Security
          </Link>
        </li>
      </ul>
    </aside>
  );
}
