// src/pages/UsersPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserManagement from '../admin-dashboard/UserManagement';

const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Fetch all users when page loads
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://kivu-back-end.onrender.com/api/ibirwa-clients/users');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // 2. Handler to navigate to your update form/page
  const handleUpdate = (userId) => {
    navigate(`/user/update/${userId}`);
  };

  // 3. Handler to block (or unblock) a user
  const handleBlock = async (userId, shouldBlock = true) => {
    try {
      await axios.patch(`https://kivu-back-end.onrender.com/api/ibirwa-clients/user/${userId}/block`, {
        blocked: shouldBlock,
      });
      const res = await axios.get('https://kivu-back-end.onrender.com/api/ibirwa-clients/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Block/unblock failed:', err);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading users…</div>;
  if (error)   return <div className="p-6 text-red-600 text-center">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">User Management</h1>

      <UserManagement
        users={users}
        onUpdate={handleUpdate}
        onBlock={handleBlock}
      />
    </div>
  );
};

export default UsersPage;
