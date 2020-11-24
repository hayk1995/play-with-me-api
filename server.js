const app = require('./app');
const appProperties = require("./app-properties");

app.on('error', (err) => {
  console.error('Server error', err);
});

app.listen(appProperties.server.port, () => {
  console.log(`Example app listening at http://localhost:${appProperties.server.port}`);
});
