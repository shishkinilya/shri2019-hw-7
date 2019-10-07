const REPOS = 'repos';
const repoContent = (repositoryId, commitHash, path) => {
  if (!(commitHash || path)) {
    return `repos/${repositoryId}`;
  }

  return `repos/${repositoryId}/tree/${commitHash || 'master'}${path ? `/${path}` : ''}`;
};
const blobContent = (repositoryId, commitHash, path) => {
  return `repos/${repositoryId}/blob/${commitHash}/${path}`;
};

export default {
  REPOS,
  repoContent,
  blobContent,
};
