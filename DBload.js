const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const Load = require('./src/DBload/Load.js')


conn.sync({ force: true })
.then(async()=>await Load.loadTypes())
.then(async()=>{
  for(let i=0; i<58;i++){
    await Load.loadPokemons(i*20,20);
  }
})
.then(()=>console.log('listo'));