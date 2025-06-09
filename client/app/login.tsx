import React, { useState } from 'react';
import RNCheckBox from '@react-native-community/checkbox';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { login, signup } from '../api/auth';
import { useAuth } from '../contexts/useAuth';
import { Alert } from 'react-native';

const CheckBox = Platform.OS === 'web'
  ? ({ value, onValueChange }: any) => (
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onValueChange(e.target.checked)}
        style={{ width: 20, height: 20, marginRight: 8 }}
      />
    )
  : RNCheckBox;

export default function AuthScreen() {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const router = useRouter();

const { login: setUser } = useAuth();


  // 로그인 상태
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const [error, setError] = useState('');

  // 회원가입 상태
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [agree, setAgree] = useState(false);

  const handleLogin = async () => {
    try {
      const userData = await login({ email: loginEmail, password: loginPassword });
      setUser(userData); // 👈 로그인 성공 후 context에 유저 정보 저장
      router.replace('/home'); // 홈으로 이동
    } catch (error: any) {
    const message = error.message || '로그인 중 오류가 발생했습니다.';
    Alert.alert('로그인 실패', message); 
    }
  };

  const handleSignup = async () => {
    if (signupPassword !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!agree) {
      setError('이용약관에 동의해주세요.');
      return;
    }

    console.log('회원가입 요청 보냄');


    try {
        const userInfo = await signup({
          email: signupEmail,
          password: signupPassword,
          name: nickname,
          userId: signupEmail,
        });
        console.log('✅ 회원가입 성공:', userInfo);

        setUser(userInfo); // ✅ 이 줄을 추가해야 홈에서 닉네임이 뜸
        console.log('✅ setUser 완료');

        router.replace('/home');
        console.log('✅ 홈으로 이동 완료');

      } catch (e) {
        console.error('❌ 회원가입 오류:', e);
        Alert.alert('회원가입 실패', e?.message || '문제가 발생했습니다.');
         setError(e?.message || '회원가입 실패');
      }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 탭 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, tab === 'login' && styles.activeTab]}
          onPress={() => setTab('login')}
        >
          <Text style={[styles.tabText, tab === 'login' && styles.activeTabText]}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'signup' && styles.activeTab]}
          onPress={() => setTab('signup')}
        >
          <Text style={[styles.tabText, tab === 'signup' && styles.activeTabText]}>회원가입</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{tab === 'login' ? '로그인' : '회원가입'}</Text>

      {tab === 'login' ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="이메일 주소를 입력하세요"
            value={loginEmail}
            onChangeText={setLoginEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 입력하세요"
            value={loginPassword}
            onChangeText={setLoginPassword}
            secureTextEntry
          />
          <View style={styles.loginOptions}>
            <View style={styles.checkboxRow}>
              <CheckBox value={autoLogin} onValueChange={setAutoLogin} />
              <Text>자동 로그인</Text>
            </View>
            <Text style={styles.link}>비밀번호 찾기</Text>
          </View>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="이메일 주소를 입력하세요"
            value={signupEmail}
            onChangeText={setSignupEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChangeText={setNickname}
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 입력하세요"
            value={signupPassword}
            onChangeText={setSignupPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 다시 입력하세요"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <View style={styles.checkboxRow}>
            <CheckBox value={agree} onValueChange={setAgree} />
            <Text>이용약관 및 개인정보처리방침에 동의합니다</Text>
          </View>
        </>
      )}

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={styles.submitButton}
        onPress={tab === 'login' ? handleLogin : handleSignup}
      >
        <Text style={styles.submitButtonText}>{tab === 'login' ? '로그인' : '회원가입'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 80,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#2ecc71',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 15,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  link: {
    color: '#888',
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
