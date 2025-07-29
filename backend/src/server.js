import express from "express"
import { ENV } from "./config/env.js";
import { connetDB } from "./config/db.js";

const app = express();

connetDB();

app.get("/",(req,res)=>res.send("Hlo"))


app.listen(ENV.PORT ,()=>console.log(`Server is running.. on ${ENV.PORT}`))