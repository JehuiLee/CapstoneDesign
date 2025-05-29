import React from 'react';
import KakaoLoginPage from './components/KakaoLoginPage';
import { AuthProvider } from './contexts/useAuth'; 

export default function App() {
  return (
    <AuthProvider>
      <KakaoLoginPage />
    </AuthProvider>
  );
}
