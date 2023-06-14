import { NODE_ENV, PORT } from "./config/config.js";
import app from "./app.js";

if(NODE_ENV){
    app.listen(PORT);
    console.log(`Server on port http://localhost:${PORT}`);
}else{
    console.log('Choississez un environement, \nvotre environement en vide');
}