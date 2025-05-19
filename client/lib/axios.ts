// lib/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://your-api.com/api', // ← 여기에 실제 API 주소 넣기
  timeout: 5000,
});

export default instance;
