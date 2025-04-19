
const {runPoolQuery} = require("./db.js");


const insertUser = async({name, email, hashedPassword, isAdmin = false}) => {

    const query = `INSERT INTO users (name, email, password, is_admin)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `
    const values = [name, email, hashedPassword,  isAdmin];
    const result = await runPoolQuery(query, values);
    return result[0];

}


module.exports = {insertUser};