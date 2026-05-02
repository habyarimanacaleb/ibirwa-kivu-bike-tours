import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, RefreshCw, UserPlus } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import UserManagement from "../components/UserManagement";
import MainLayout from "../admin-panel/MainLayout";
import AddUserModal from "../features/admin/AddUserModal";

const UsersPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Explicitly destructure only the methods we need
  const { 
    users, 
    loading, 
    error, 
    fetchUsers, 
    handleBlock, 
    deleteUser, 
    adminRegisterUser 
  } = useAuthStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRegister = async (data) => {
    // 2. Ensure this matches the function name in your store
    const result = await adminRegisterUser(data);
    if (result.success) {
      fetchUsers(); // Refresh the table
    }
    return result;
  };

  const handleUpdate = (userId) => {
    navigate(`/user/update/${userId}`);
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
              Manage platform access, roles, and account statuses.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-2xl font-bold text-sm transition-all"
          >
            <UserPlus size={18} />
            Add New User
          </button>
        </div>

        {/* Status States */}
        {loading && (
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

        {/* 3. Explicitly pass props instead of using {...store} */}
        {!loading && (
          <UserManagement
            users={users}
            onUpdate={handleUpdate}
            onBlock={handleBlock}
            onDelete={deleteUser}
          />
        )}

        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onRegister={handleRegister}
          isLoading={loading}
        />
      </div>
    </MainLayout>
  );
};

export default UsersPage;