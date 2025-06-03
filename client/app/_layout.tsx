import { Slot } from 'expo-router';
import { AuthProvider } from '../contexts/useAuth';

export default function Layout() {
  console.log('✅ Root Layout 적용됨');
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
