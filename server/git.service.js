const fs = require('fs');
const fse = require('fs-extra');
const child = require('child_process');
const { join } = require('path');
const { promisify } = require('util');
const { parseLsTreeLog } = require('./utils');

const promisifiedReadDir = promisify(fs.readdir);

const getRepoList = dirPath => promisifiedReadDir(dirPath, 'utf8');

const addRepo = (dirPath, { url }) => {
  const CHILD_PROCESS_TIMEOUT = 60 * 10 ** 3;
  return new Promise((resolve, reject) => {
    const childProcess = child.spawn('git', ['clone', url, '-q'], { cwd: dirPath });

    // setTimeout(() => {
    //   childProcess.kill();
    //   reject('Timeout exceeded');
    // }, CHILD_PROCESS_TIMEOUT);

    childProcess.stderr.on('data', error => reject(error.toString()));
    childProcess.on('close', () => resolve());
  });
};

const getCommitList = (dirPath, { repositoryId, commitHash }) => {
  return new Promise((resolve, reject) => {
    const childProcess = child.spawn(
      'git',
      ['log', '--pretty=format:{"commit": "%H", "author": "%aN", "date": "%at", "message": "%f"},', commitHash],
      {
        cwd: join(dirPath, repositoryId),
      },
    );
    let result = '';

    childProcess.stdout.on('data', data => result += data);
    childProcess.stderr.on('data', error => reject(error.toString()));
    // slice removes last comma
    childProcess.on('close', () => resolve(`[${result.slice(0, -1)}]`));
  });
};

const getCommitDiff = (dirPath, { repositoryId, commitHash }) => {
  return new Promise(((resolve, reject) => {
    const childProcess = child.spawn(
      'git',
      ['show', commitHash, '-m', '--format="%b"'],
      {
        cwd: join(dirPath, repositoryId),
      },
    );
    let result = '';

    childProcess.stdout.on('data', data => result += data);
    childProcess.stderr.on('data', error => reject(error.toString()));
    childProcess.on('close', () => resolve(result));
  }));
};

const getRepoContent = (dirPath, { repositoryId, commitHash, path }) => {
  return new Promise((resolve, reject) => {
    const gitArgs = ['ls-tree', commitHash || 'master'];

    if (path) {
      gitArgs.push(`${path}/`);
    }

    const childProcess = child.spawn(
      'git',
      gitArgs,
      {
        cwd: join(dirPath, repositoryId),
      },
    );
    let result = [];

    childProcess.stdout.on('data', data => result.push(...parseLsTreeLog(data.toString())));
    childProcess.stderr.on('data', error => reject(error.toString()));
    childProcess.on('close', () => resolve(result));
  })
};

const getFileContent = (dirPath, { repositoryId, commitHash, pathToFile }, onDataCb, onErrCb, onCloseCb) => {
  const childProcess = child.spawn(
    'git',
    ['show', `${commitHash}:${pathToFile}`],
    {
      cwd: join(dirPath, repositoryId),
    }
  );

  childProcess.stdout.on('data', onDataCb);
  childProcess.stderr.on('data', onErrCb);
  childProcess.on('close', onCloseCb);
};

const deleteRepo = (dirPath, { repositoryId }) => fse.remove(join(dirPath, repositoryId));

module.exports = {
  getRepoList,
  addRepo,
  getCommitList,
  getCommitDiff,
  getRepoContent,
  getFileContent,
  deleteRepo,
};
