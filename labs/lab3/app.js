var express = require('express')
, app = module.exports = express();

app.set("view engine", "ejs");
const bodyParser = require("body-parser");
const busboyBodyParser = require("busboy-body-parser");
const storage = require("./projects");

const projects = require("./routes/projects");
let proj = projects.proj_arr;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(busboyBodyParser());

app.use("/projects", projects);

app.get("/", (req, res) => res.render("index",{}));

app.listen(8080, () => console.log("UP!"));