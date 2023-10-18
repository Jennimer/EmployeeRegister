require("dotenv").config();
const express = require('express');
const cors = require("cors")
const routes = require("./routes")
const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/', (req, res) =>
{
    res.send('Welcome to IceCream Factory employees register!')
})


//MongoDB connection
const PORT = process.env.PORT || 8000
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
    {
        console.log('connected to MongoDB')
        app.listen(PORT, () =>
        {
            console.log(`Node API app is running on port ${PORT}`)
        });
    }).catch((error) =>
    {
        console.log(error)
        process.exit(1);
    })

app.use("/api", routes);

