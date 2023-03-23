const express = require("express");
const app = express();

const cookieparser = require("cookie-parser");
app.use(cookieparser());
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Swagger
const cors = require("cors");
dotenv.config();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Morgan
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const port = 9000;

const bodyParser = require("body-parser");
app.use(express.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());

//connect to mongo
mongoose
  .connect(process.env.MONGODB_LINK_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDb  Connected..."))
  .catch((err) => console.log(err));

// Static Files
app.use(express.static("public"));

// Morgan
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));

// Implement Swagger

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Travel API",
        version: "1.0.0",
      description: "Travel API Information",
      contact: {
        name: "Travel API",
      },
      servers: ["http://localhost:9000"],
    },
  },
  apis: ["index.js"],
  // apis: ["./routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /userdetails:
 * get:
 * description: Use to request all users
 * responses:
 * '200':
 * description: A successful response
 */

app.get("/userdetails", (req, res) => {
    res.send(
        [
            {
                "id": "5f9f1b0b1b9d8c2b1c8b8b8b",
                "username": "admin",
                "email": "admin@gmail.com",
                "role": "admin",
                "image": "http://localhost:9000/profileImgs/5f9f1b0b1b9d8c2b1c8b8b8b.jpg",
                "imagegiven": true,
            },
            {
                "id": "5f9f1b0b1b9d8c2b1c8b8b8c",
                "username": "user",
                "email": "user@gmail.com",
                "role": "user",
                "image": "http://localhost:9000/profileImgs/5f9f1b0b1b9d8c2b1c8b8b8c.jpg",
                "imagegiven": true,
            },
        ]
    )
})

//routes
app.use("/users", require("./routes/users"));
app.use("/profile", require("./routes/profile"));
app.use("/index", require("./routes/index"));
app.use("/places", require("./routes/places"));
app.use("/book", require("./routes/book"));
app.use("/admins", require("./routes/admins"));
app.use("/payment", require("./routes/payments"));

app.listen(port, function () {
  console.log("server is running on the port 9000");
});
