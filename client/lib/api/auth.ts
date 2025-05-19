// 로그인 API 함수

// lib/api/auth.ts
import axios from '../axios';

export const loginWithKakao = async (token: string) => {
  const res = await axios.post('/auth/login/kakao', {
    kakao_access_token: token,
  });
  return res.data; // user 정보 반환
};
