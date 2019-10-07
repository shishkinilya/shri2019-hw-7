import apiClient from 'apiClient';
import { getBlobContent, getBlobContentSuccess, getBlobContentFail } from 'store/blob/actions';

const fetchBlobContent = (repositoryId, commitHash, path) => {
  return (dispatch) => {
    dispatch(getBlobContent());

    apiClient.getBlobContent(repositoryId, commitHash, path)
      .then(content => {
        dispatch(getBlobContentSuccess(content));
      })
      .catch(() => getBlobContentFail());
  }
};

export default fetchBlobContent;
