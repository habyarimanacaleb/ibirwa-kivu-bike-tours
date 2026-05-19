import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";

export default function UserManagementDashboard() {
  // 1. ATOMIC SELECTORS: Pull slice-by-slice so updates to 'error' or 'currentUser' 
  // do not trigger a cascading re-render loop here.
  const users = useAuthStore((state) => state.users);
  const fetchUsers = useAuthStore((state) => state.fetchUsers);
  const handleBlock = useAuthStore((state) => state.handleBlock);
  const deleteUser = useAuthStore((state) => state.deleteUser);
  const currentUser = useAuthStore((state) => state.currentUser);
  const loading = useAuthStore((state) => state.loading);

  const [search, setSearch] = useState("");

  // 2. LENGTH GUARD + EMPTY DEPENDENCY MATRIX
  // This explicitly guarantees it fires ONLY when the component mounts AND the array is empty.
  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
  }, []); // Keep this dependency array clear to avoid hook firing cycles

  const filteredUsers = users.filter(user => 
    user.username?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

  // Fallback structural check to identify current admin safely
  const isSelf = (userId) => {
    const currentId = currentUser?.id || currentUser?._id;
    return currentId === userId;
  };

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 max-w-6xl mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between border-b border-slate-100 pb-5 mb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">User Directory</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage and audit access credentials across your application instance.</p>
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <input
            type="text"
            placeholder="Search username or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 text-sm border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50 p-2 border"
          />
        </div>
      </div>

      {loading && users.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center gap-2 text-slate-400">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-medium">Loading ledger documents...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-xs uppercase tracking-wider font-semibold bg-slate-50/50">
                <th className="py-3 px-4">Profile Identity</th>
                <th className="py-3 px-4">System Role</th>
                <th className="py-3 px-4">Clearance Status</th>
                <th className="py-3 px-4 text-right">Operational Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredUsers.map((user) => (
                <tr key={user._id || user.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-semibold text-slate-800">{user.username}</div>
                    <div className="text-xs text-slate-400 font-normal">{user.email}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      user.role === "admin" 
                        ? "bg-rose-50 border-rose-100 text-rose-700" 
                        : "bg-blue-50 border-blue-100 text-blue-700"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold ${
                      user.blocked 
                        ? "bg-amber-100 text-amber-800" 
                        : "bg-emerald-100 text-emerald-800"
                    }`}>
                      {user.blocked ? "SUSPENDED" : "ACTIVE"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleBlock(user._id || user.id, !user.blocked)}
                      disabled={isSelf(user._id || user.id)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                        user.blocked
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                          : "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
                      } disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                      {user.blocked ? "Unblock" : "Block"}
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to completely delete ${user.username}?`)) {
                          deleteUser(user._id || user.id);
                        }
                      }}
                      disabled={isSelf(user._id || user.id)}
                      className="text-xs font-bold bg-slate-50 text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 border border-slate-200 px-3 py-1.5 rounded-lg transition-all disabled:opacity-40"
                    >
                      Purge
                    </button>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-sm text-slate-400 font-medium">
                    No matching users found in directory registry.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}