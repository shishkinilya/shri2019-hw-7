const GET_BLOB_CONTENT = '[BLOB] Get blob content';
const GET_BLOB_CONTENT_SUCCESS = '[BLOB] Get blob content success';
const GET_BLOB_CONTENT_FAIL = '[BLOB] Get blob content fail';

export function getBlobContent() {
  return { type: GET_BLOB_CONTENT };
}

export function getBlobContentSuccess(content) {
  return {
    type: GET_BLOB_CONTENT_SUCCESS,
    payload: {
      content
    }
  };
}

export function getBlobContentFail() {
  return { type: GET_BLOB_CONTENT_FAIL };
}

export default {
  GET_BLOB_CONTENT,
  GET_BLOB_CONTENT_SUCCESS,
  GET_BLOB_CONTENT_FAIL
}
