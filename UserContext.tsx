
import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { UserRole } from './types';

interface UserContextType {
  userRole: UserRole | null;
  userIdentifier: string | null;
  login: (role: UserRole, identifier?: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userIdentifier, setUserIdentifier] = useState<string | null>(null);

  const login = (role: UserRole, identifier?: string) => {
    setUserRole(role);
    if (identifier) {
      setUserIdentifier(identifier);
    }
  };

  const logout = () => {
    setUserRole(null);
    setUserIdentifier(null);
  };

  return (
    <UserContext.Provider value={{ userRole, userIdentifier, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};