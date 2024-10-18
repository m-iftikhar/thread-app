import express from 'express';
import dotenv from "dotenv";
import connectDB from './db/Connectdb.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();
connectDB();
const app=express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));  
// app.use(express.urlencoded({ extended: false })) is a line in Express that helps the app understand data sent from forms. Setting extended: false means it will use a simple way to read that data
app.use(cookieParser());
// app.use(cookieParser()) is a line in Express that allows the app to read cookies from incoming requests. It helps in accessing cookie data easily, making it simpler to manage user sessions and preferences.
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);











app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));