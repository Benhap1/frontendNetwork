import axios from 'axios';

export default {
  api(data) {
    return axios.post('http://localhost:8090/api/v1/storage', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  postPhoto(data) {
    return axios.post('/post/storagePostPhoto?type=IMAGE', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
