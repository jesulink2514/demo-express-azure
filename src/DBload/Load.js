const axios = require("axios");
const { Types, Pokemon } = require('../db');

module.exports = {
    loadTypes: async () => {
        const types = await axios.get('https://pokeapi.co/api/v2/type');

        const typesNames = types.data.results.map(e => { return { name: e.name } });

        await Types.bulkCreate(typesNames);
    },

    loadPokemons: async (start, limit = 50) => {

        // const pokemonName = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${start}&limit=${limit}`)
        //     .then(response => response.data.results);


        //     pokemonName.forEach(async(poke)=>{
        //     const pokeInfo = await axios.get(poke.url).then(res => res.data);
        //     const types = pokeInfo.types.map(e=>e.type.name);
        //     const typesId = await Types.findAll({
        //         where: {
        //             name: types
        //         },
        //         attributes: ['id']
        //     }).then((a)=>a.map(e=>e.id));

        //     await Pokemon.create({
        //         name: pokeInfo.name,
        //         idPoke: pokeInfo.id,
        //         health: pokeInfo.stats[0]?.base_stat,
        //         attack: pokeInfo.stats[1]?.base_stat,
        //         defense: pokeInfo.stats[2]?.base_stat,
        //         attackEsp: pokeInfo.stats[3]?.base_stat,
        //         defenseEsp: pokeInfo.stats[4]?.base_stat,
        //         speed: pokeInfo.stats[5]?.base_stat,
        //         heigth: pokeInfo.height,
        //         weight: pokeInfo.weight,
        //         img: pokeInfo.sprites.other.home.front_default&&pokeInfo.sprites.other.home.front_default
        //     })
        //     .then((pokemon)=>{
        //         pokemon.addTypes(typesId);
        //     });
        // });

        const pokemonName = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${start}&limit=${limit}`)
            .then(response => response.data.results);


        const pokemonRequests = pokemonName.map(async (poke) => {
            const pokeInfo = await axios.get(poke.url).then(res => res.data);
            const types = pokeInfo.types.map(e => e.type.name);
            const typesId = await Types.findAll({
                where: {
                    name: types
                },
                attributes: ['id']
            }).then((a) => a.map(e => e.id));

            const pokemon = await Pokemon.create({
                name: pokeInfo.name,
                idPoke: pokeInfo.id,
                health: pokeInfo.stats[0]?.base_stat,
                attack: pokeInfo.stats[1]?.base_stat,
                defense: pokeInfo.stats[2]?.base_stat,
                attackEsp: pokeInfo.stats[3]?.base_stat,
                defenseEsp: pokeInfo.stats[4]?.base_stat,
                speed: pokeInfo.stats[5]?.base_stat,
                heigth: pokeInfo.height,
                weight: pokeInfo.weight,
                img: pokeInfo.sprites.other.home.front_default && pokeInfo.sprites.other.home.front_default
            });

            pokemon.addTypes(typesId);
        });

        return Promise.all(pokemonRequests);
    }
}