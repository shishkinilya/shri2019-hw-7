module.exports = {
  baseUrl: 'http://localhost:3001',
  gridUrl: 'http://0.0.0.0:4444/wd/hub',
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
      },
    },
  },
  plugins: {
    'html-reporter/hermione': {
      path: 'tests/hermione/hermione-html-reporter',
    },
    'hermione-custom-commands': true,
  },
};
