const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getVideogames} = require ("../controllers/getVideogames.js"); 
const {getVideogamesId} = require ("../controllers/getVideogameId.js");
const {gameName} = require ("../controllers/getVideogameName.js");
const {postVideogame} = require ("../controllers/postVideogame.js");
const {getGenre} = require('../controllers/getGenders.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", (req,res) => {
    getVideogames(req,res);
});

router.get("/videogames/:idVideogame", (req,res) => {
    getVideogamesId(req,res);
});

 router.get("/videogame", (req,res) => {
    gameName(req,res);
 });

 router.post("/videogame", (req,res) => {
    postVideogame(req,res);
 });

router.get("/genres", (req,res) => {
    getGenre(req,res);    
});


module.exports = router;
