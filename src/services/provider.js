import axios from "axios";

const handleResponse = (data) => {
  return data;
};

const handleError = (data) => {
  const { response } = data;
  return response;
};

export const apiProvider = {
  get: (url) => {
    return axios.get(url).then(handleResponse).catch(handleError);
  },
  getOne: (url, id) => {
    return axios.get(`${url}/${id}`).then(handleResponse).catch(handleError);
  },
  post: (url, payload) => {
    return axios.post(url, payload).then(handleResponse).catch(handleError);
  },
  postOne: (url, id, payload) => {
    return axios
      .post(`${url}/${id}`, payload)
      .then(handleResponse)
      .catch(handleError);
  },
  put: (url, payload) => {
    return axios.put(url, payload).then(handleResponse).catch(handleError);
  },
  putOne: (url, id, payload) => {
    return axios
      .put(`${url}/${id}`, payload)
      .then(handleResponse)
      .catch(handleError);
  },
};
