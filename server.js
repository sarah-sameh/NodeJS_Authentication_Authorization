require("dotenv").config({ path: "./config.env" });


const server = require("./app");
const connectDB = require("./db");

const port = process.env.PORT;


connectDB(process.env.MONGO_URI);
console.log(process.env.NODE_ENV);

server.listen(port, () => console.log(`Server is listening on port ${port}!`));
