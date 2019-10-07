const express = require('express');
const argv = require('yargs').argv;
const path = require('path');
const mime = require('mime-types');
const cors = require('cors');

const gitService = require('./git.service');

const app = express();
const dirPath = argv.path;

app.use(express.json());
app.use(cors());

app.get('/api/repos', async (req, res) => {
  try {
    const repoList = await gitService.getRepoList(dirPath);
    res.json({ data: repoList });
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
});

app.post('/api/repos', async (req, res) => {
  try {
    await gitService.addRepo(dirPath, req.body);
    res.json({ data: { status: 'ok' } });
  } catch (error) {
    res.status(500);
    res.json({
      error: {
        message: error,
      },
    });
  }
});

app.get('/api/repos/:repositoryId/commits/:commitHash', async (req, res) => {
  try {
    const commitList = await gitService.getCommitList(dirPath, req.params);
    res.json({ data: JSON.parse(commitList) });
  } catch (error) {
    res.json({ error });
  }
});

app.get('/api/repos/:repositoryId/commits/:commitHash/diff', async (req, res) => {
  try {
    const commitDiff = await gitService.getCommitDiff(dirPath, req.params);
    res.json({ data: commitDiff });
  } catch (error) {
    res.json({ error });
  }
});

app.get('/api/repos/:repositoryId', async (req, res) => {
  try {
    const repoContent = await gitService.getRepoContent(dirPath, req.params);
    res.json({ data: repoContent });
  } catch (error) {
    res.json({ error });
  }
});

app.get('/api/repos/:repositoryId/tree/:commitHash?/:path([^/]*)?', async (req, res) => {
  try {
    const repoContent = await gitService.getRepoContent(dirPath, req.params);
    res.json({ data: repoContent });
  } catch (error) {
    res.json({ error });
  }
});

app.get('/api/repos/:repositoryId/blob/:commitHash/:pathToFile([^/]*)?', (req, res) => {
  const { repositoryId, pathToFile } = req.params;
  const filePath = path.join(dirPath, repositoryId, pathToFile);
  const contentType = mime.contentType(path.extname(filePath));
  const dataCb = data => res.write(data);
  const errCb = (error) => {
    res.status(500);
    res.json({ error: error.toString() });
  };
  const closeCb = () => res.send();

  res.type(contentType || 'application/octet-stream');
  gitService.getFileContent(dirPath, req.params, dataCb, errCb, closeCb);
});

app.delete('/api/repos/:repositoryId', async (req, res) => {
  try {
    await gitService.deleteRepo(dirPath, req.params);
    res.json({ data: { status: 'ok' } });
  } catch (error) {
    res.json({ error });
  }
});

app.listen(3000);
