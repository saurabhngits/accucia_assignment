const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/accucia", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("DB connected successfully");
})
.catch((err) => {
    console.log(err)
    console.log("DB connection failed");
})