import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = "http://localhost:4000";

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
console.log(axiosClient);
axiosClient.defaults.timeout = 2000;

export function getRequest(URL, options) {
  return axiosClient.get(`${URL}`, options).then((response) => response);
}

export function postRequest(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then((response) => response);
}

export function patchRequest(URL, payload) {
  return axiosClient.patch(`/${URL}`, payload).then((response) => response);
}

export function deleteRequest(URL) {
  return axiosClient.delete(`/${URL}`).then((response) => response);
}
