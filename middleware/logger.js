
// creates a simple middleware logger function
const logger = (req, res, next) => {
	console.log("Log");
	next();
}



module.exports = logger;