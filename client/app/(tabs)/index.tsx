// 로그인 화면면
// app/index.tsx
import { useAuth } from '@/hooks/useAuth';
import { loginWithKakao } from '@/lib/api/auth';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
// import * as KakaoLogin from '@react-native-seoul/kakao-login'; // 실제 앱에서 사용

export default function IndexScreen() {
  const { isLoggedIn, setLoginState } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/(tabs)/home');
    }
  }, [isLoggedIn]);

  const handleLogin = async () => {
    try {
      // const kakaoToken = await KakaoLogin.login();
      const dummyToken = 'test-token'; // 테스트용
      const user = await loginWithKakao(dummyToken);
      setLoginState(user);
    } catch (e) {
      console.error('로그인 실패:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인 해주세요</Text>
      <Button title="카카오로 로그인" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 20 },
});
