import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import KakaoLogin from '@react-native-seoul/kakao-login';

const handleKakaoLogin = async () => {
  try {
    const result = await KakaoLogin.login();
    console.log('로그인 성공:', result);
  } catch (error) {
    console.error('로그인 실패:', error);
  }
};

export default function KakaoLoginPage() {
  const handleKakaoLogin = () => {
    console.log('카카오 로그인 시도!');
    Alert.alert('로그인 버튼 눌림', '카카오 로그인 시도');
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
    marginTop: 0,
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
