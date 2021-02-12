const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require("./utilites/db");
const userRouter = require("./controllers/user");
const adminRouter = require("./controllers/admin");

const app = express();

connectDB();

app.use(express.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

const PORT = process.env.PORT | 3000;

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});