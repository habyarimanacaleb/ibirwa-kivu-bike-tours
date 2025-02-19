import React, { createContext, useState, useEffect, useContext } from "react";

// Create UserContext
export const UserContext = createContext();

// Create UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // If no user is stored, set default role for testing
      const defaultUser = { role: "admin", name: "Test User" }; // Adjust as needed
      setUser(defaultUser);
      localStorage.setItem("user", JSON.stringify(defaultUser)); // Save to localStorage for testing
    }
  }, []);

  // Save user to localStorage whenever user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Function to update user state
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Function to clear user state
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
