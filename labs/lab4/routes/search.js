let express = require("express");
let router = express.Router();

let storage = require("./../modules/projects");
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();


router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true }));
router.use(upload.array()); 
router.use(express.static('public'));


router.get("/", (req, res) => {
    storage.getAll()
    .then(data => res.render("search", { proj_arr: data}))
    .catch(err => res.sendStatus(500));
});

router.get("/?:search_data(\w+/g)", (req, res) => {
    let name = req.params.search_data;
    console.log(name);
    storage.getAll()
    .then(arr => arr.filter(x => x.name.indexOf(name)))
    .then(proj_arr =>res.render("search",{proj_arr:data}));
});

module.exports = router;