import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'http://localhost:8081'; // 실제 서버 주소로 바꿔주세요

// 공통 axios 인스턴스
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// 토큰 자동 추가
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ 로그인
export const login = async ({ email, password }: { email: string; password: string }) => {
  console.log('회원가입 요청 보냄:', { email, password, name });
  const res = await api.post('/api/auth/login', { email, password });
  const data = res.data;

  await AsyncStorage.setItem('accessToken', data.accessToken);
  await AsyncStorage.setItem('refreshToken', data.refreshToken);

  // 로그인 후 사용자 정보 받아오기
  const userInfo = await getMyInfo();
  return userInfo; // nickname 등 포함

  // return await getMyInfo();

};

// ✅ 회원가입
export const signup = async ({
  email,
  password,
  name,
  userId,
}: {
  email: string;
  password: string;
  name: string;
  userId: string;
}) => {
  const res = await api.post('/api/auth/signup', { email, password, name, userId });
  return res.data;
};

// ✅ 로그아웃
export const logout = async () => {
  try {
    await api.post('/api/auth/logout');
  } catch (e) {
    console.warn('서버 로그아웃 실패:', e);
  } finally {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
  }
};

// ✅ 토큰 재발급
export const refreshAccessToken = async () => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  const res = await axios.post(`${BASE_URL}/api/auth/refresh-token`, null, {
    headers: { 'X-Refresh-Token': refreshToken || '' },
  });

  const data = res.data;
  await AsyncStorage.setItem('accessToken', data.accessToken);
  return data;
};

// ✅ 내 정보 조회
export const getMyInfo = async () => {
  const res = await api.get('/api/user/me');
  return res.data;
};

// ✅ 닉네임 변경
export const updateNickname = async (newNickname: string) => {
  const res = await api.patch('/api/user/nickname', { newNickname });
  return res.data;
};

// ✅ 비밀번호 변경
export const updatePassword = async (newPassword: string) => {
  const res = await api.patch('/api/user/password', { newPassword });
  return res.data;
};
