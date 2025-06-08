import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/useAuth';
import { useRouter } from 'expo-router';

export default function Index() {
  console.log('✅ index.tsx 렌더링됨');

  const { user } = useAuth();
  // const auth = useAuth(); // 전체 context 객체로 받아옴
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />
      <View style={[styles.filledCircle, styles.filled1]} />
      <View style={[styles.filledCircle, styles.filled2]} />

      <Text style={styles.title}>
        AKA에 방문해주셔서{'\n'}감사합니다!
        {/* {user ? `${user.nickname}님, 환영합니다!` : 'AKA에 방문해주셔서 감사합니다!'} */}
      </Text>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => router.push('/login')}
      >
        <Text style={styles.loginButtonText}>AKA로 입장하기</Text>
        <Text style={styles.loginSubText}>로그인/회원가입</Text>
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
  loginButton: {
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
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  loginSubText: {
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
