let express = require("express");
let router = express.Router();
let storage = require("./../modules/projects");
const fs = require("fs-promise");

router.get("/", (req, res, next) => {
    storage.getAll()
        .then(data => res.render("project_form", {}))
        .catch(err => res.sendStatus(500));
});

router.post('/post_enctype.asp', function(req, res){
    if(!req.body) return res.sendStatus(400);

    let logo = req.files.logo;
    let type ="." + logo.mimetype.substring(6);
    let base64String = logo.data.toString('base64');
    let new_proj = {
        name : req.body.projName,
        description : req.body.projDescription,
        status : req.body.projStatus,
        team :  req.body.teamName,
        man_hour :  req.body.manhour,
        rating :  req.body.projRating,
        start_date :  req.body.startDate,
        finish_date :  req.body.finishDate,
        image : "./images/" + req.body.projName + type
    }
 
    storage.getAll()
    .then(arr => storage.makeId(arr))
    .then(id =>fs.writeFile("public/images/" + new_proj.name + type,new Buffer(base64String, 'base64'))); 
    
    storage.create(new_proj)
        .then(data =>{
            let path = "/projects/" +  new_proj.id;
            res.redirect(path);
        });
 });
module.exports = router;