const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config()
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_DB_ONLINE_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Database is connected");
})
.catch((error) => {
  console.error("MongoDB connection error:", error);
});

// Routes
const visitform_route = require("./routes/visitform");
const auth_route = require("./routes/auth");
const property_route = require("./routes/property");

app.get("/", (req, res) => {
  res.json({ msg: "This is a property management website running." });
});

// Middleware for routes
app.use("/api", visitform_route, auth_route, property_route);

// Start the backend server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
