import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

// 사용자 정보 타입 정의
interface User {
  id: number;
  nickname: string;
  email: string;
}

// Context에서 사용할 값의 타입 정의
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean; // ✅ 여기도 이름 변경
  login: (userData: User) => void;
  logout: () => void;
}

// Context 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider 컴포넌트 정의
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  const isAuthenticated = !!user; // ✅ 여기서 이름 변경

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Context 사용을 위한 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
