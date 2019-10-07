function parseLsTreeLog(log) {
  const result = [];
  const entries = log.split('\n').filter(entry => !!entry);

  entries.forEach((entry) => {
    const name = entry.split('\t')[1];
    const type = entry.split(' ')[1];

    result.push({ name, type });
  });

  return result;
}

module.exports = {
  parseLsTreeLog
};
