import apiClient from 'apiClient';
import { getRepositoryContent, getRepositoryContentSuccess, getRepositoryContentFail } from 'store/repository/actions';

const fetchRepositoryContent = (repositoryId, commitHash, path) => {
  return (dispatch) => {
    dispatch(getRepositoryContent());

    apiClient.getRepoContent(repositoryId, commitHash, path)
      .then(body => dispatch(getRepositoryContentSuccess(body.data)))
      .catch(() => getRepositoryContentFail());
  }
};

export default fetchRepositoryContent;
