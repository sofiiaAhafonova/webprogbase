let express = require("express");
let router = express.Router();

let storage = require("./../modules/projects");


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