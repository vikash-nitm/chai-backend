import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true

}))



// express.json() → API/JavaScript se bheja gaya JSON handle karta hai.

// express.urlencoded() → HTML forms se bheja gaya data handle karta hai.



// {
//     "username": "vikash",
//     "age": 22
//   }
//   req.body // { username: "vikash", age: 22 }

app.use(express.json({limit:"16kb"}))

{/* <form method="POST" action="/submit">
  <input name="username" value="vikash">
  <input name="age" value="22">
</form>
username=vikash&age=22
{ user: { name: "Vikash", age: 22 } } */}


app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import

import userRouter from './routes/user.routes.js'



//routes declaration mtlab koi bhi user type krega to hum control dedenege userRouter ko
//fir ye user.routes.js mai chlajyega.
app.use("/users",userRouter)

//agr api hai to
//mtlab agr hum /api/v1/usersye gye to userRouter pe jyenge
//jo activate ho jyega fir uske aage /register lgyenge to
//registeruser call hojyega.or registeruser pe jaise jyenge
//to eska definition user.controller se aarhi hai.to
//agr sb shi hai to response miljna chiye ok
app.use("/api/v1/users",userRouter)



// http://localhost:8000/users/register
// http://localhost:8000/users/login
// http://localhost:8000/api/v1/users/register



export { app }  