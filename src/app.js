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



export { app }  