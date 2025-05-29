// 연동후 아래코드로 
import { Slot } from 'expo-router';
import { AuthProvider } from '../../contexts/useAuth';

export default function Layout() {
  return (
    <AuthProvider>
      <Slot /> {/* 현재 라우트에 해당하는 페이지 컴포넌트가 여기에 렌더링됨 */}
    </AuthProvider>
  );
}

// // 테스트할땐 이걸로
// import { useEffect } from 'react';
// import { useRouter } from 'expo-router';
// import { Slot } from 'expo-router';

// export default function RootLayout() {
//   const router = useRouter();

//   useEffect(() => {
//     router.replace('/main'); // 앱 켜자마자 /main 경로로 이동
//   }, []);

//   return <Slot />;
// }