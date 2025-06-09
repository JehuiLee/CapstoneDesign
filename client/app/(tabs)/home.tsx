import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/useAuth'; // 파일 위치에 따라 경로 조정

export default function Home() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>AKA</Text>

      <View style={styles.welcomeBox}>
      <Text style={styles.welcomeText}>
        {isAuthenticated && user ? `${user.nickname} 님` : '방문자 님'}
      </Text>
        <Text style={styles.welcomeBold}>환영합니다!</Text>
      </View>

      <View style={styles.menuContainer}>
        <Pressable style={styles.menuButton} onPress={() => router.push('/mypage')}>
          <Text style={styles.menuText}>마이페이지</Text>
        </Pressable>

        <Pressable style={styles.menuButton} onPress={() => router.push('/history')}>
          <Text style={styles.menuText}>영수증 히스토리</Text>
        </Pressable>

        <Pressable style={styles.menuButton} onPress={() => router.push('/payment')}>
          <Text style={styles.menuText}>결제수단 관리</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  welcomeBox: {
    backgroundColor: '#F5F6FC',
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  welcomeBold: {
    fontSize: 20,
    fontWeight: '700',
  },
  menuContainer: {
    marginTop: 32,
    gap: 16,
  },
  menuButton: {
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
  },
});