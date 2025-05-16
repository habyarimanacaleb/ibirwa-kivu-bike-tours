import React from 'react';

const UserManagement = ({ users, onUpdate, onBlock }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 bg-white shadow rounded-lg">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {users.map((user) => (
          <tr key={user._id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.role}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              {user.blocked ? (
                <span className="text-red-600 font-semibold">Blocked</span>
              ) : (
                <span className="text-green-600 font-semibold">Active</span>
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              <button
                onClick={() => onUpdate(user._id)}
                className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Update
              </button>
              <button
                onClick={() => onBlock(user._id, !user.blocked)}
                className={`px-3 py-1 rounded ${
                  user.blocked
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                {user.blocked ? 'Unblock' : 'Block'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default UserManagement;
