import dotenv from "dotenv"
import mongoConnect from "./db/index.db.js";
import {app} from './app.js'
dotenv.config({
    path: './.env'
})



mongoConnect()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})