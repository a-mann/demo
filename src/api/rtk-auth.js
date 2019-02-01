import axios from 'axios';
import {API_ENDPOINT} from 'aliasConstants';

const axiosInstance = axios.create({
  baseURL: '/mock/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

const axiosTestInstance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export async function sendUser() {
  return axiosInstance.get('/user.json');
}

export async function authUser(user) {
  return axiosTestInstance.post(
    `/login`,
    {
      "username": user.login,
      "password": user.pass
    }
  );
}

export async function Logout() {
  return axiosTestInstance.post(
    `/logout`
  );
}