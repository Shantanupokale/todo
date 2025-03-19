import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import AuthRoute from "./routes/authRoutes.js";
import TodoRoute from "./routes/todoRoutes.js";



dotenv.config();

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
};


//initialize express app
const app = express();



//middleware
app.use(cors(corsOptions));
app.use(express.json());




//routes
app.use("/api/users", AuthRoute); //authouter will be used after api/users/authroutes
app.use("/api/todos", TodoRoute); //todoRouter will be used after api/todos/todoroutes




// app.get("/", (req, res) => {
//     res.send("Hello World");
// });


//global error handler
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Internal Server Error";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        
    });
});



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

