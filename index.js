const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const Load = require('./src/DBload/Load.js')

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`%s listening at ${port}`); // eslint-disable-line no-console
});
