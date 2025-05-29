import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import KakaoLogin from '@react-native-seoul/kakao-login';
import axios from 'axios';
import { useAuth } from '../../contexts/useAuth'; // 상대경로 수정
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

// // 백엔드와 연동되면 이 코드들 주석처리하고 진행하기 (_layout.tsx에도 주석할거있음 )
// export default function HomeRedirect() {
//   const router = useRouter();

//   useEffect(() => {
//     router.replace('/mypage'); // 앱 켜자마자 /main으로 강제 이동
//   }, []);

//   return null; // 화면 안 보여줌
// }

export default function Index() {
  const { login } = useAuth();
  const router = useRouter();

  const handleKakaoLogin = async () => {
    try {
      const result = await KakaoLogin.login();
      console.log('로그인 성공:', result);

      const accessToken = result.accessToken;

      // 백엔드로 토큰 전송
      const response = await axios.post('http://192.168.0.18:8080/auth/kakao-login', {
        accessToken,
      });

      const userData = response.data;
      login(userData); // 전역 상태 저장

      router.replace('/(tabs)'); // 메인 탭 화면으로 이동
      Alert.alert('로그인 완료', `${userData.nickname}님 환영합니다!`);
    } catch (error) {
      console.error('카카오 로그인 실패:', error);
      Alert.alert('로그인 실패', error.message || '알 수 없는 에러');
    }
  };

  return (
    <View style={styles.container}>
      {/* 배경 도형 */}
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />
      <View style={[styles.filledCircle, styles.filled1]} />
      <View style={[styles.filledCircle, styles.filled2]} />

      {/* 텍스트 */}
      <Text style={styles.title}>AKA에 방문해주셔서{'\n'}감사합니다!</Text>

      {/* 로그인 버튼 */}
      <TouchableOpacity style={styles.kakaoButton} onPress={handleKakaoLogin}>
        <Text style={styles.kakaoButtonText}>AKA로 입장하기</Text>
        <Text style={styles.kakaoSubText}>for kakao</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 60,
  },
  kakaoButton: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
  },
  kakaoButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  kakaoSubText: {
    fontSize: 10,
    color: '#555',
    marginTop: 4,
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  circle1: {
    width: 300,
    height: 300,
    top: -60,
    left: -100,
  },
  circle2: {
    width: 250,
    height: 250,
    bottom: 20,
    right: -80,
  },
  filledCircle: {
    position: 'absolute',
    backgroundColor: '#6BBF74',
    borderRadius: 999,
  },
  filled1: {
    width: 40,
    height: 40,
    top: 80,
    right: 40,
  },
  filled2: {
    width: 25,
    height: 25,
    bottom: 90,
    left: 60,
  },
});
