const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require("./utilites/db");
const userRouter = require("./controllers/user");
const adminRouter = require("./controllers/admin");

const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

app.use(express.static('client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT | 5000;

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});