import { NODE_ENV, PORT } from "./config/config.js";
import app from "./app.js";

if(NODE_ENV){
    app.listen(PORT);
    console.log(`Le serveur de ${NODE_ENV} est en cours d'exécution, sur le port ${PORT}.\nhttp://localhost:${PORT}`);
}else{
    console.log('Choississez un environement, votre environement en vide');
}