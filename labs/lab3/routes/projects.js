let express = require("express");
let router = express.Router();

let storage = require("./../projects");

router.get("/", (req, res, next) => {
    res.render("projects");
});

router.get("/:project_id(\\d+)",
    (req, res, next) => {
        res.render("project");
    });

module.exports = router;