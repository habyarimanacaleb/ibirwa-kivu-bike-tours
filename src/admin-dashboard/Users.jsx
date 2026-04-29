import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import UserManagement from '../components/UserManagement';
import MainLayout from '../admin-panel/MainLayout';

const UsersPage = () => {
  const navigate = useNavigate();
  
  // Connect to global store
  const { users, loading, error, fetchUsers, handleBlock, deleteUser } = useAuthStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUpdate = (userId) => {
    navigate(`/user/update/${userId}`);
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-6 text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">User Administration</h1>
          <button 
            onClick={() => navigate('/admin/register-user')}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition"
          >
            + Add New User
          </button>
        </div>

        {loading && <div className="text-center py-10">Loading User Database...</div>}
        {error && <div className="bg-red-500/20 border border-red-500 p-4 rounded mb-4">{error}</div>}

        {!loading && (
          <UserManagement
            users={users}
            onUpdate={handleUpdate}
            onBlock={handleBlock}
            onDelete={deleteUser} // Pass delete capability
          />
        )}
      </div>
    </MainLayout>
  );
};

export default UsersPage;
