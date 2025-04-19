require("dotenv").config({ path: __dirname + "/.env" });
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;

const connectionString = process.env.connectionString;


module.exports = ({
    JWT_ADMIN_SECRET,
    JWT_USER_SECRET,
    connectionString
})