const GET_REPOSITORY_CONTENT = '[REPOSITORY] Get repository content';
const GET_REPOSITORY_CONTENT_SUCCESS = '[REPOSITORY] Get repository content success';
const GET_REPOSITORY_CONTENT_FAIL = '[REPOSITORY] Get repository content fail';
const SET_CURRENT_PATH = '[REPOSITORY] Set current path';

export function getRepositoryContent() {
  return { type: GET_REPOSITORY_CONTENT };
}

export function getRepositoryContentSuccess(content) {
  return {
    type: GET_REPOSITORY_CONTENT_SUCCESS,
    payload: {
      content
    },
  };
}

export function getRepositoryContentFail() {
  return { type: GET_REPOSITORY_CONTENT_FAIL };
}

export function setCurrentPath(path) {
  return {
    type: SET_CURRENT_PATH,
    payload: {
      path,
    },
  };
}

export default {
  GET_REPOSITORY_CONTENT,
  GET_REPOSITORY_CONTENT_SUCCESS,
  GET_REPOSITORY_CONTENT_FAIL,
  SET_CURRENT_PATH,
}
