require("dotenv").config();
require('./db/index');

const path = require("path")

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const patientRoutes = require("./routes/patient");
const appointmentRoutes = require("./routes/appointment")
const pcrtestRoutes = require("./routes/pcrtest")




//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "uploads")));
// app.use(express.static(path.join(__dirname, "public")));
//My Routes


app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", patientRoutes);
app.use("/api", appointmentRoutes);
app.use("/api", pcrtestRoutes);


//Port
const port = process.env.PORT || 8000;
app.use('//', (req, res) => {
    res.send('Welcome :)')
});
//Starting a server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});
