import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (username: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate API call delay
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    await delay(1500); // Simulate network request to Flask backend
    
    // Mock user data response
    const mockUser: User = {
      id: 'u_123',
      username: email.split('@')[0],
      email: email,
      avatar: 'https://picsum.photos/150/150?random=99',
      bio: 'Just here for the vibes ✨',
      stats: {
        following: '142',
        followers: '8.5k',
        likes: '45.2k'
      }
    };
    
    setUser(mockUser);
    setIsLoading(false);
  };

  const register = async (username: string, email: string, pass: string) => {
    setIsLoading(true);
    await delay(1500); // Simulate network request
    
    const newUser: User = {
      id: `u_${Math.random().toString(36).substr(2, 9)}`,
      username: username,
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${username}&background=random`,
      bio: 'New to TokClone! 👋',
      stats: {
        following: '0',
        followers: '0',
        likes: '0'
      }
    };
    
    setUser(newUser);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};