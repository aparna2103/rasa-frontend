import { getCookie } from './utils';
import { BACKEND_API_URL } from '../constants'

export async function backendFetchUrl(url, options = {}) {
  const token = getCookie('rasatoken');
  // const token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MTQxNzA2MDAsImV4cCI6MTcxNDI1NzAwMH0.N4n7ZgmD_Kev74TPjp6kfQ9w4hX7u5iKLilGquzP4jdO3lWa9uWelWqUb6W1bMq";
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'Access-Control-Allow-Origin': '*',
    ...options.headers,
  };
  return fetch(BACKEND_API_URL + url, { ...options, headers });
}
