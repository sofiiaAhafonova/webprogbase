const fs = require("fs-promise");


let gen_id = 0;

fileReader();

function fileWriter() {
  		fs.writeFile("projects.json",
        JSON.stringify(proj_arr, null, 4),
        (err) => {
            if (err) throw err;
        });
}
 
function fileReader() {
    const promise = fs.readFile("projects.json");
    promise.then(fileText => {
        proj_arr = JSON.parse(fileText);
    }).catch(() => {
        return;
    });
}

function  makeId() {
	gen_id++;
    if (proj_arr.lenght === 0) return gen_id;
    else {
        proj_arr.forEach((value) => {
            if (value.id === gen_id) {
                return makeId();
            } else return gen_id;
        });
    }
    return gen_id; 
}
function create(projectBuf) {
    return new Promise((resolve, reject) => {
        proj_arr.push(projectBuf);
        fileWriter();
        resolve(projectBuf);
        });
}

function getAll() {
    return new Promise((resolve, reject) => {
        if (proj_arr.length !== 0) resolve(proj_arr);
        else reject("Empty");
    });
}

function getById(proj_id) {
    let response = null;
    console.log(proj_id);

    proj_arr.forEach((value) => {
        if (value.id == proj_id)  response = value;
    });
    console.log(response);
    return new Promise((resolve, reject) => {
        if (proj_id < 0 || response == null) reject("Wrong id");
        if (proj_arr.lenght <= 0) reject("Array is empty");
        resolve(response);
    });
}

function update(proj_update) {
	proj_arr.forEach((proj) => {
        if (proj.id == proj_update.id) {
            response = proj_arr.indexOf(proj);
        }
    });
    return new Promise((resolve, reject) => {
		proj_arr.splice(response, 1, proj_update);
		fileWriter();
		resolve(proj_update.id);
	});
}
 
function remove(proj_id) {
    let response = null;
    proj_arr.forEach((proj) => {
        if (proj.id == proj_id) {
            response = proj_arr.indexOf(proj);
        }
    });
    return new Promise((resolve, reject) => {
        if (proj_id < 0 || response == null) reject("Wrong id");
        if (proj_arr.lenght === 0) reject("Array is empty");
        proj_arr.splice(response,1);
        fileWriter();
        resolve(proj_id);
    });
}
function readFile(){
    return new Promise((resolve, reject) => {
        fs.readFile("projects.json")
        .then(fileText => JSON.parse(fileText.toString()));
        
    });
}
module.exports = {
    create,
    getAll,
    getById,
    update,
	remove,
    makeId,
    readFile
}