import { connect } from "mongoose"

const uri = 'mongodb+srv://melC14:Melody$14@cluster0.v7ykago.mongodb.net/sevika';



connect(uri)
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.log("Database connection error", err.message);
    });