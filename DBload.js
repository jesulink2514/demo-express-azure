const { conn } = require('./src/db.js');
const Load = require('./src/DBload/Load.js')

conn.sync({ force: true })
  .then(async () => await Load.loadTypes())
  .then(async () => {
    for (let i = 0; i < 58; i++) {
      const take = 20;
      const resumeIndex = i * take;
      await Load.loadPokemons(i * 20, 20);
      console.info(`Recorded from ${resumeIndex}...`);
    }
  })
  .then(() => console.log('listo'));