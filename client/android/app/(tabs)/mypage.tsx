import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../contexts/useAuth'; // 경로는 상황에 맞게 조정

export default function MyPage() {
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout(); // 유저 상태 초기화
    router.replace('/'); // 로그인 페이지로 이동
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user?.nickname}님, 환영합니다!</Text>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 24,
  },
  logoutButton: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
