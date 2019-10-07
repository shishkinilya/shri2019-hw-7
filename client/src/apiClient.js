import axios from 'axios';

import ENDPOINTS from 'constants/endpoints';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
});

axiosInstance.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);

const getRepos = () => axiosInstance.get(ENDPOINTS.REPOS);
const getRepoContent = (repositoryId, commitHash, path) => {
  return axiosInstance.get(ENDPOINTS.repoContent(repositoryId, commitHash, path));
};
const getBlobContent = (repositoryId, commitHash, path) => {
  return axiosInstance.get(ENDPOINTS.blobContent(repositoryId, commitHash, path));
};

export default {
  getRepos,
  getRepoContent,
  getBlobContent,
};
