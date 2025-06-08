import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/useAuth';

export default function MyPage() {
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Page</Text>

      <TouchableOpacity style={styles.item}>
        <Text>비밀번호 변경</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Text>회원 닉네임 변경</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Text>알림설정</Text>
      </TouchableOpacity>

      {/* 오른쪽 하단에 로그아웃 버튼 */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutArea}>
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  item: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  logoutArea: {
    position: 'absolute',
    bottom: 100,
    right: 44,
  },
  logoutText: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'underline',
  },
});
