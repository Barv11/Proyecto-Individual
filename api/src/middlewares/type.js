const { Router } = require('express');
const { Type } = require('../db/db.js');
const axios = require('axios').default
const router = Router();

router.get('/', async (req,res) => {
    
    try {
        const types = await Type.findAll({
            order: [
                ["name"],
            ]
        });

        if(!types.length) {
            const response = await axios.get('https://pokeapi.co/api/v2/type')
                .then(res => res.data.results)
                    
            await Type.bulkCreate(response,{
                    attributes: ['name']
                });
            const types = await Type.findAll({
                order: [
                    ["name"],
                ]
            });

           return res.status(200).json(types);
        } 

        res.status(200).json(types);
        
    } catch (err) {
        res.status(404).json({
            error: err.code,
            description: err.message,
        });
    }

    
    
    
    
    
    
    
    
    
    
    
    
    // // bulkCreate -> por ejemplo que manden un json repleto de información por el body y quieren que se agreguen muchos elementos juuntos  (arreglo de objetos)
    // // Player.bulkCreate(req.body);
    // try {
    //     fetch('https://pokeapi.co/api/v2/type')
    //         .then(res => res.json())
    //         .then(async (res) => {
    //             const addTypes = await Type.bulkCreate(res.results);
    //         })
    //         .catch(e => console.log(e))
        
    //     // const types = await Type.findAll();
        
    //     // res.json(types);

    // } catch (error) {
    //     res.status(404).json({error: error.message})
    // }
});

// router.post('/', async(req,res) => {
//     try {
//         const addTypes = await Type.bulkCreate(req.body.results,{
//             attributes: ['name']
//         });
//         res.json(addTypes);
//     } catch (error) {
//         res.status(404).json({error: error.message});
//     }
// });

module.exports = router;