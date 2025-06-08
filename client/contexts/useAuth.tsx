import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMyInfo, logout as logoutApi } from '../api/auth'; // 백엔드 로그아웃 함수 가져오기

interface User {
  id: number;
  nickname: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // 자동 로그인
  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        try {
          const userInfo = await getMyInfo(); // 토큰이 유효하면 유저 정보 받아옴
          setUser(userInfo);
        } catch (e) {
          console.log('자동 로그인 실패', e);
        }
      }
    };
    loadUser();
  }, []);

  const login = (userData: User) => setUser(userData);

  const logout = async () => {
    try {
      await logoutApi(); // 백엔드에 로그아웃 요청
    } catch (e) {
      console.warn('백엔드 로그아웃 실패:', e);
    }
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
