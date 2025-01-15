import axios from 'axios';
import store from '@/store';

axios.defaults.headers['content-type'] = 'application/json';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8085/api/v1/";

const token = localStorage.getItem('user-token');

if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

axios.interceptors.response.use(null, (error) => {
  console.error(error.response.status);

  const errorMessage = error.response.data.error_description || ' ';

  if (error.response) {
    if (error.response.status === 403) {
      console.log("Have to refresh Token");
      store.dispatch("auth/api/refreshToken");
    }
    if (error.response.status === 400) {
      store.dispatch('global/alert/setAlert', {
        status: 'error',
        text: `Ошибка ${error.response.status}: ${errorMessage}`,
      });
    }
    if (error.response.status === 401) {
      console.log('user-token3='+localStorage.getItem('user-token'))

      localStorage.removeItem('user-token');
      localStorage.removeItem('refresh-token');
      store.commit('auth/api/setToken', null);
      window.location.replace('/login');
    }
    store.dispatch('global/alert/setAlert', {
      status: 'error',
      text: `Ошибка ${error.response.status}: ${errorMessage}`,
    });
  } else if (error.request) {
    store.dispatch('global/alert/setAlert', {
      status: 'error',
      text: 'Нет ответа от сервера',
    });
  } else {
    console.log('user-token='+localStorage.getItem('user-token'))
    store.dispatch('global/alert/setAlert', {
      status: 'error',
      text: 'Неизвестная ошибка',
    });
    console.log('user-token2='+localStorage.getItem('user-token'))
  }

  console.error('Axios error', { error });
  return Promise.reject(error);
});