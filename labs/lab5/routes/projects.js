let express = require("express");
let router = express.Router();

let storage = require("./../modules/projects");

router.get("/", (req, res, next) => {
    storage.getAll()
        .then(data => res.render("projects", { proj_arr: data}))
        .catch(err => res.sendStatus(500));
});

router.get("/:project_id(\\d+)",
    (req, res) => {
        let id = req.params.project_id;
       storage.getById(id)
        .then(project => res.render("project", {project}),
        err => res.sendStatus(404))
        .catch(err => res.sendStatus(500));
    });
router.post("/:project_id(\\d+)/remove",
    (req, res) => {
        
        let id = req.params.project_id;
       storage.remove(id)
        .then(project => res.redirect("/projects"),
            err => res.sendStatus(404))
        .catch(err => res.sendStatus(500));
    });
module.exports = router;