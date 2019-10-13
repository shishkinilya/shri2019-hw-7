import {
  GET_REPOSITORY_CONTENT,
  GET_REPOSITORY_CONTENT_FAIL,
  GET_REPOSITORY_CONTENT_SUCCESS,
  SET_CURRENT_PATH,
  RepositoryActionTypes,
  RepositoryItem,
} from './types';

export function getRepositoryContent(): RepositoryActionTypes {
  return { type: GET_REPOSITORY_CONTENT };
}

export function getRepositoryContentSuccess(content: Array<RepositoryItem>): RepositoryActionTypes {
  return {
    type: GET_REPOSITORY_CONTENT_SUCCESS,
    payload: {
      content
    },
  };
}

export function getRepositoryContentFail(): RepositoryActionTypes {
  return { type: GET_REPOSITORY_CONTENT_FAIL };
}

export function setCurrentPath(path: string): RepositoryActionTypes {
  return {
    type: SET_CURRENT_PATH,
    payload: {
      path,
    },
  };
}

