let express = require("express");
let router = express.Router();

let storage = require("./../modules/projects");
let project = storage.project;
router.get("/", (req, res, next) => {
    storage.getAll()
        .then(data => res.render("project_form", { }))
        .catch(err => res.sendStatus(500));
});

module.exports = router;