// src/pages/UsersPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserManagement from '../components/UserManagement';
import MainLayout from '../admin-panel/MainLayout';

const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://demo.ibirwakivubiketours.com/api/ibirwa-clients/users');
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
  const handleUpdate = (userId) => {
    navigate(`/user/update/${userId}`);
  };
  const handleBlock = async (userId, shouldBlock = true) => {
    try {
      await axios.patch(`https://demo.ibirwakivubiketours.com/api/ibirwa-clients/user/${userId}/block`, {
        blocked: shouldBlock,
      });
      const res = await axios.get('https://demo.ibirwakivubiketours.com/api/ibirwa-clients/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Block/unblock failed:', err);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading users…</div>;
  if (error)   return <div className="p-6 text-red-600 text-center">{error}</div>;

  return (
    <MainLayout>
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">User Management</h1>

      <UserManagement
        users={users}
        onUpdate={handleUpdate}
        onBlock={handleBlock}
      />
    </div>
    </MainLayout>
  );
};

export default UsersPage;
