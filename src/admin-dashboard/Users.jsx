import React, { useEffect, useState } from "react";
import { AlertCircle, RefreshCw, UserPlus } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import UserManagement from "../components/UserManagement";
import MainLayout from "../admin-panel/MainLayout";
import AddUserModal from "../features/admin/AddUserModal";
import EditUserModal from "../features/admin/EditUserModal"; // Import your new edit modal

const UsersPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { 
    users, 
    loading, 
    error, 
    fetchUsers, 
    handleBlock, 
    deleteUser, 
    adminRegisterUser,
    updateProfile 
  } = useAuthStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRegister = async (data) => {
    const result = await adminRegisterUser(data);
    if (result.success) {
      fetchUsers(); 
    }
    return result;
  };

  // Trigger modal display instead of navigating to an external page route
  const handleUpdateClick = (userId) => {
    const targetUser = users.find((u) => u._id === userId);
    if (targetUser) {
      setSelectedUser(targetUser);
      setIsEditModalOpen(true);
    }
  };

  const handleUpdateExecute = async (userId, updateData) => {
    const result = await updateProfile(userId, updateData);
    if (result && result.success) {
      fetchUsers(); // Clean re-sync from store array pool
    }
    return result;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter">
              User Administration
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage platform access, roles, and account statuses from a single panel view.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-2xl font-bold text-sm transition-all"
          >
            <UserPlus size={18} />
            Add New User
          </button>
        </div>

        {/* Status States */}
        {loading && !users.length && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <RefreshCw size={32} className="animate-spin mb-4 text-blue-500" />
            <span className="text-xs font-black uppercase tracking-widest">
              Syncing User Database...
            </span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl text-sm font-medium">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {/* User Inventory Table */}
        {users && (
          <UserManagement
            users={users}
            onUpdate={handleUpdateClick} // Captures ID and opens edit modal
            onBlock={handleBlock}
            onDelete={deleteUser}
          />
        )}

        {/* CREATE MODAL */}
        <AddUserModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onRegister={handleRegister}
          isLoading={loading}
        />

        {/* EDIT/UPDATE MODAL */}
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
          onUpdate={handleUpdateExecute}
          isLoading={loading}
        />
      </div>
    </MainLayout>
  );
};

export default UsersPage;