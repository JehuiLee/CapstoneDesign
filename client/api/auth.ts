import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'http://localhost:8081'; // 실제 백엔드 주소로 교체 필요

// 공통 axios 인스턴스
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// 요청마다 accessToken 자동 추가
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * ✅ 로그인
 * 성공 시 access/refresh 토큰 저장 + 사용자 정보 반환
 */
export const login = async ({ email, password }: { email: string; password: string }) => {
  try {
    const res = await api.post('/api/auth/login', { email, password });
    const data = res.data;

    await AsyncStorage.setItem('accessToken', data.accessToken);
    await AsyncStorage.setItem('refreshToken', data.refreshToken);

    const userInfo = await getMyInfo(); // 닉네임 포함된 유저 정보
    return userInfo;
  } catch (error: any) {
    const message = error?.response?.data?.message || '로그인 실패';
    throw new Error(message);
  }
};

/**
 * ✅ 회원가입
 */
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
  const res = await api.post('/api/auth/signup', {
    email,
    password,
    name,
    userId,
  });
  return res.data;
};

/**
 * ✅ 로그아웃
 */
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

/**
 * ✅ access token 재발급
 */
export const refreshAccessToken = async () => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');

  const res = await axios.post(`${BASE_URL}/api/auth/refresh-token`, null, {
    headers: { 'X-Refresh-Token': refreshToken || '' },
  });

  const data = res.data;
  await AsyncStorage.setItem('accessToken', data.accessToken);
  return data;
};

/**
 * ✅ 내 정보 조회 (닉네임 등 포함)
 */
export const getMyInfo = async () => {
  const res = await api.get('/api/user/me');
  return res.data;
};

/**
 * ✅ 닉네임 변경
 */
export const updateNickname = async (newNickname: string) => {
  const res = await api.patch('/api/user/nickname', { newNickname });
  return res.data;
};

/**
 * ✅ 비밀번호 변경
 */
export const updatePassword = async (newPassword: string) => {
  const res = await api.patch('/api/user/password', { newPassword });
  return res.data;
};
