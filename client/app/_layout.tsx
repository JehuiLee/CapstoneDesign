import { Slot } from 'expo-router';
import { AuthProvider } from '../contexts/useAuth'; // ← 상대경로만 확인

export default function Layout() {
  return (
    <AuthProvider>
      <Slot />  {/* 현재 경로에 해당하는 컴포넌트 자동 렌더링 */}
    </AuthProvider>
  );
}
