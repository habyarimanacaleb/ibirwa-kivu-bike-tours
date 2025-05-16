// src/components/UpdateUserForm.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateUserForm = () => {
  const { userId } = useParams();            // match your route: /users/update/:userId
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Fetch the existing user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://kivu-back-end.onrender.com/api/ibirwa-clients/user/${userId}`
        );
        const user = res.data.user;
        setFormData({
          username: user.username || '',
          email: user.email || '',
          role: user.role || ''
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  // 2. Handle form changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // 3. Submit updates
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://kivu-back-end.onrender.com/api/ibirwa-clients/user/${userId}`,
        formData
      );
      navigate('/users'); // back to UsersPage
    } catch (err) {
      console.error(err);
      setError('Failed to update user.');
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error)   return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Update User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Role (optional) */}
        <div>
          <label className="block font-medium">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserForm;
