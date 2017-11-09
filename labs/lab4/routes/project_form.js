let express = require("express");
let router = express.Router();
let storage = require("./../modules/projects");

router.get("/", (req, res, next) => {
    storage.getAll()
        .then(data => res.render("project_form", {}))
        .catch(err => res.sendStatus(500));
});

router.post('/post_enctype.asp', function(req, res){
    if(!req.body) return res.sendStatus(400);
    let new_proj = {name : req.body.projName,
    description : req.body.projDescription,
   status : req.body.projStatus,
   team :  req.body.teamName,
   man_hour :  req.body.manhour,
    rating :  req.body.projRating,
    start_date :  req.body.startDate,
   finish_date :  req.body.finishDate,
   image : req.body.img
}
   
    storage.create(new_proj)
     .then(data => res.send("recieved your request! \n"));
 });
module.exports = router;