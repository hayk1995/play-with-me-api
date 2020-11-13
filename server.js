require('dotenv').config();

const app = require('./app');
const config = require('config');

app.on('error', (err) => {
  console.error('Server error', err);
});

app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${config.port}`)
})
