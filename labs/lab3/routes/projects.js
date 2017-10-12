let express = require("express");
let router = express.Router();

let storage = require("./../projects");

router.get("/", (req, res, next) => {
    storage.getAll()
        .then(data => res.render("projects", { proj_arr: data}))
        .catch(err => res.sendStatus(500));
});

router.get("/:project_id(\\d+)",
    (req, res) => {
        let id = req.params.project_id;
        let project;
       storage.getById(id).then(project =>{
           if (project == null) 
                res.sendStatus(404);
           else 
                res.render("project", {project});
       } ).catch(err => res.sendStatus(500));;
    });

module.exports = router;