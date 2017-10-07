let express = require("express");
let router = express.Router();

let storage = require("./../projects");



//storage.getAll().then(res => proj = res)
storage.writeFile()
    .then(data=> proj_arr = data);
router.get("/", (req, res, next) => {
    res.render("projects", { proj_arr});
});

router.get("/:project_id(\\d+)",
    (req, res) => {
        let id = req.params.id;
        let project =  proj_arr.get(id - 1);
        res.render("project", {project});
    });

module.exports = router;