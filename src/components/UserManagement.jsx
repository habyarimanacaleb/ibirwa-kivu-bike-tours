import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Trash2, 
  Edit3, 
  User,
  UserX,
  UserCheck
} from "lucide-react";

const UserManagement = ({ users, onUpdate, onBlock, onDelete }) => {

console.log("Props received by UserManagement:", { users, onUpdate, onBlock, onDelete });
  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-white rounded-3xl border border-dashed border-slate-200">
        <User size={48} className="text-slate-300 mb-4" />
        <h3 className="text-slate-400 font-bold uppercase tracking-widest text-sm">No Users Found</h3>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white rounded-3xl border border-slate-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">User</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Email</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Role</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
              <th className="px-6 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                      {user.username.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm font-bold text-slate-900">{user.username}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-500 capitalize">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.blocked ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-rose-50 text-rose-600">
                      <ShieldAlert size={12} /> Blocked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600">
                      <ShieldCheck size={12} /> Active
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onUpdate(user._id)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                      title="Edit"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button 
                      onClick={() => onBlock(user._id, !user.blocked)}
                      className={`p-2 rounded-xl transition-all ${user.blocked ? 'text-emerald-500 hover:bg-emerald-50' : 'text-amber-500 hover:bg-amber-50'}`}
                      title={user.blocked ? "Unblock" : "Block"}
                    >
                      {user.blocked ? <UserCheck size={16} /> : <UserX size={16} />}
                    </button>
                    <button 
                      onClick={() => onDelete(user._id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;