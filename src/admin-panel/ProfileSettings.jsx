import React from "react";

export default function ProfileSettings() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            className="mt-1 block w-full border rounded p-2"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email Address</label>
          <input
            type="email"
            className="mt-1 block w-full border rounded p-2"
            placeholder="you@example.com"
          />
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}
