import axios from 'axios';

import ENDPOINTS from 'constants/endpoints';
import { RepositoryItem } from './store/repository/types';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
});

axiosInstance.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);

interface GetReposResponse {
  data: Array<string>;
}

interface GetRepoContentResponse {
  data: Array<RepositoryItem>;
}

const getRepos = () => axiosInstance.get<GetReposResponse>(ENDPOINTS.REPOS);
const getRepoContent = (repositoryId: string, commitHash?: string, path?: string) => {
  return axiosInstance.get<GetRepoContentResponse>(ENDPOINTS.repoContent(repositoryId, commitHash, path));
};
const getBlobContent = (repositoryId: string, commitHash: string, path: string) => {
  return axiosInstance.get<string>(ENDPOINTS.blobContent(repositoryId, commitHash, path));
};

export default {
  getRepos,
  getRepoContent,
  getBlobContent,
};
