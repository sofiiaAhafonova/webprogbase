
const projects = require("./projects");
const prompt = require("prompt");
process.stdin.setEncoding("utf8");

let  get_cmd = "Please, input your command:  ";


process.stdin.on("readable", () => {
   const input = process.stdin.read();
   if (input !== null) {
       let command = input.toString().trim();
       if (command === "create()") {
		   inputProject()
		   .then(proj_new => {
			   console.log(proj_new);
			   return (proj_new);
			}).then(proj_new => projects.create(proj_new));
       }
       else if (command === "getAll()") {
           projects.getAll()
           		.then(returnedString => console.log(returnedString))
           		.catch(err => console.log(err));
       }
       else if (command.search(regExpGetById) !== -1) {
           const number = command.toString().trim().match(regExpNumber);
           projects.getById(number)
		   		.then(returnedString => console.log(returnedString))
				   .catch(err => {	
					   if (!err) 
							console.log("wrong id");
						});
       }
       else if (command.search(regExpUpdate) !== -1) {
           const number = command.toString().trim().match(regExpNumber);
           projects.getById(number).then(update => inputField(update))
           .then(result => projects.update(result))
			.then(id => console.log('Element with id ' + number + ' was updated'))
			.catch(err => {	
				if (!err) 
					 console.log("wrong id");
				 });
       }
       else if (command.search(regExpRemove) !== -1) {
           const number = command.toString().trim().match(regExpNumber);
           projects.remove(number).then(returned => {
               console.log('Element with id ' + number + ' was removed');
           }).catch(err => {	
			if (!err) 
				 console.log("wrong id");
			 });
       }
       else
            askQuestion();
   }
});

process.stdin.on("end", () => {
   process.stdout.write("end");
});

const regExpGetById = /[g][e][t][B][y][I][d][(]\d+[)]/g;
const regExpRemove = /[r][e][m][o][v][e][(]\d+[)]/g;
const regExpUpdate = /[u][p][d][a][t][e][(]\d+[)]/g;
const regExpNumber = /\d+/g;

let project = {
    properties: {
        name: {
            description: "Enter a project name",
			type: "string",
            pattern: /\w+/g,
            message: "Name must be only letters",
            required: true
        },
        description: {
            description: "Enter your project description",
            type: "string",
            required: true
        },
        status: {
            description: "Enter your project status",
            type: "string",
            required: true
		},
		team: {
			description: "Enter your team name",
			type: "string",
            pattern: /\w+/g,
            required: true
		},
		man_hour: {
			description: "Enter man-hour value",
			pattern: /^[0-9]+$/,
            type: "string",
            required: true
		},	
        rating: {
            description: "Enter project rating",
            pattern: /^[1-5][.][0-9]$/,
            message: "Rating must be from 1.0 to 5.0",
            required: true
        },
        start_date: {
            description: "Enter your project start date",
            pattern: /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
            message: "Date must be only YYYY-MM-DD",
            required: true
		},
		finish_date: {
            description: "Enter your project finish date",
            pattern: /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
            message: "Date must be only YYYY-MM-DD",
            required: true
		}
		
		
    }
};
 
function askQuestion() {
    process.stdout.write(get_cmd);
}
function inputProject() {
    return new Promise((resolve, reject) => {
        prompt.get(project,
            (err, result) => {
                const projectBuf = {
                    id: 0,
                    name: result.name,
                    description: result.description,
                    status: result.status,
                    team: result.team,
                    man_hour: result.man_hour,
                    rating: result.rating,
                    start_date: result.start_date,
                    finish_date: result.finish_date
                }
                resolve(projectBuf);
            });
    });
}

function inputField(proj){
    return new Promise((resolve, reject) => {
        prompt.get(["field", "toChange"],
        (err, result) => {
            switch (result.field) {
                case "name":
                    proj.name = result.toChange;
                    resolve(proj);
                    break;
                case "description":
                    proj.description = result.toChange;
                    resolve(proj);
                    break;
                case "team":
                    proj.team = result.toChange;
                    resolve(proj);
                    break;
                case "status":
                    proj.status = result.toChange;
                    resolve(proj);
                    break;
                case "man_hour":
                    proj.man_hour = result.toChange;
                    resolve(proj);
                    break;
                case "start_date":
                    proj.start_date = result.toChange;
                    resolve(proj);
                    break;
                case "finish_date":
                    proj.finish_date = result.toChange;
                    resolve(proj);
                    break;
                default:
                    reject("Wrong field name");
                    break;
            }
        });
    });
}


askQuestion();