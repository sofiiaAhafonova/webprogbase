const fs = require("fs-promise");


let gen_id = 0;


function  makeId() {
    gen_id++;
    let proj_arr = getAll();
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
    return  getAll()
    .then(arr => {
        arr.push(projectBuf);
        return Promise.resolve(arr);
    })
    .then(arr => fs.writeFile("projects.json",
    JSON.stringify(arr, null, 4)));
}

function getAll() {
    return fs.readFile('projects.json')
        .then(x => JSON.parse(x));
}

function getById(proj_id) {
    return getAll()
    .then(arr => {
        let index = arr.findIndex(el => el.id == proj_id);
        if (index > -1) 
            return Promise.resolve(arr[index]);
        else
            return Promise.reject("Wrong id");
    });
}

function update(proj_update) {
    return getAll()
    .then(arr => {
        let index = arr.findIndex(el => el.id == proj_update.id);
        if(index >  -1)
            arr.splice(index, 1, proj_update);
        else 
            return Promise.reject("Wrong id");
        return Promise.resolve(arr);
    })
    .then(arr => fs.writeFile("projects.json",
    JSON.stringify(arr, null, 4)));
}
 
function remove(proj_id) {
    return getAll()
    .then(arr => {
        let index = arr.findIndex(el => el.id == proj_id);
        if(index >  -1)
            arr.splice(index,1);
        else 
            return Promise.reject("Wrong id");
        return Promise.resolve(arr);
    })
    .then(arr => fs.writeFile("projects.json",
    JSON.stringify(arr, null, 4)));
}

module.exports = {
    create,
    getAll,
    getById,
    update,
	remove,
	makeId
}