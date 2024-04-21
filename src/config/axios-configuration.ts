import axios from 'axios';

const setAuthToken = (token:string) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

const axiosBaseUrl = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;

  return axios;
};

export {
  axiosBaseUrl,
  setAuthToken
};
