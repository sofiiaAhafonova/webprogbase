let express = require("express");
let router = express.Router();
let storage = require("./../modules/projects");
router.use(express.static("public"));

var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true }))

router.get("/", (req, res, next) => {
    storage.getAll()
        .then(data => res.render("project_form", {}))
        .catch(err => res.sendStatus(500));
});

router.post('/post_enctype.asp', function(req, res){
    if(!req.body) return res.sendStatus(400);
    let new_proj = storage.project;
    console.log(req.body);
  

    // new_proj.description = req.body.description;
    // new_proj. status = req.body.status;
    // new_proj.team =  req.body.team;
    // new_proj.man_hour =  req.body.man_hour;
    // new_proj.rating =  req.body.rating;
    // new_proj.start_date =  req.body.start_date;
    // new_proj.finish_date =  req.body.finish_date;

    storage.create(new_proj)
     .then(data => res.send("recieved your request! \n" + data));
 });
module.exports = router;