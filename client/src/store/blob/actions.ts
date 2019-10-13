import { GET_BLOB_CONTENT, BlobActionTypes, GET_BLOB_CONTENT_SUCCESS, GET_BLOB_CONTENT_FAIL } from './types';

export function getBlobContent(): BlobActionTypes {
  return { type: GET_BLOB_CONTENT };
}

export function getBlobContentSuccess(content: string): BlobActionTypes {
  return {
    type: GET_BLOB_CONTENT_SUCCESS,
    payload: {
      content
    }
  };
}

export function getBlobContentFail(): BlobActionTypes {
  return { type: GET_BLOB_CONTENT_FAIL };
}
