import express from "express"
import { ENV } from "./config/env.js";
import { connetDB } from "./config/db.js";
import cors from "cors"
import {clerkMiddleware} from "@clerk/express"
import userRoutes from "./routes/user.route.js";
import { postRoute } from "./routes/post.route.js";
const app = express();

app.use(cors());
app.use(express.json())

app.use(clerkMiddleware());


app.get("/", (req, res) => res.send("Hlo"))

app.use("/api/users",userRoutes)
app.use("/api/posts",postRoute)

const startServer = async () => {
    try {
        await connetDB();
        app.listen(ENV.PORT, () => console.log(`Server is running.. on ${ENV.PORT}`))

    } catch (error) {
        console.error("Failed to start server", error.message);
        process.exit(1);
    }
}

startServer();
