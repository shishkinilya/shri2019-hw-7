const REPOS = 'repos';
const repoContent = (repositoryId: string, commitHash?: string, path?: string) => {
  if (!(commitHash || path)) {
    return `repos/${repositoryId}`;
  }

  return `repos/${repositoryId}/tree/${commitHash || 'master'}${path ? `/${path}` : ''}`;
};
const blobContent = (repositoryId: string, commitHash: string, path: string) => {
  return `repos/${repositoryId}/blob/${commitHash}/${path}`;
};

export default {
  REPOS,
  repoContent,
  blobContent,
};
