 
import  express from 'express'
import mongoose from 'mongoose'
 import process from 'process'
import  dotenv , { config  } from 'dotenv'
import { authRouter } from './api/user.js'
import EventEmitter from 'events';
import cookieParser from 'cookie-parser'
import {app , server} from './socket.io/socket.js'
import path from 'path'

 dotenv.config({path : "../.env"});
const emitter = new EventEmitter();
emitter.setMaxListeners(20);
app.use(cors({ 
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}))
//  const __dirname = path.resolve();

//  app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.use(express.json());
app.use(cookieParser())

 

mongoose.connect(process.env.MONGO_DB_URL )
.then(() => console.log('Connected to MongoDB successfully'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

app.use('/user' , authRouter);
<<<<<<< HEAD
// app.get("*" , (req, res)=>{
//   res.sendFile(path.join(__dirname  ,"frontend" , "dist" , "index.html"))
// })
server.listen(3001 , ()=> console.log("server Start! "));
=======
app.get("*" , (req, res)=>{
  res.sendFile(path.join(__dirname  ,"frontend" , "dist" , "index.html"))
})
 server.listen(3001 , ()=> console.log("server Start! "));
>>>>>>> 48194c4e153401851b2fa462b9f9d21187b2c2b6
