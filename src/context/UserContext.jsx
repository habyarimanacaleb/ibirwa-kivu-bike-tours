import React, { createContext, useState, useEffect, useContext } from "react";

// Create a Context for the user
export const UserContext = createContext();

// UserProvider component to provide context to the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data from localStorage when the app initializes
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // Parse the stored user object and set the user state
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Store user data in localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Function to update the user in the context
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Function to clear the user (e.g., on logout)
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

// Custom hook to use the user context in any component
export const useUser = () => {
  return useContext(UserContext);
};
