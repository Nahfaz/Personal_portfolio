import { getAllUsers } from "./controllers/users.js";

const users = await getAllUsers(); 
console.log(users);