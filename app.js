const express = require("express");
const dbConfig = require("./src/config/db.config");
const mongoose = require("mongoose");
// const route = require("./src/api/routes/route");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const db = require("./src/integration");
const Role = db.role;

async function connect() {
  try {
    await mongoose.connect('mongodb+srv://wdsteambe2003:123abc456@wdsdatabase.i3up3zz.mongodb.net/website');
    console.log('connect success')
  } catch (error) {
    console.log('connect failure')
  }
}
connect();
app.use(cors(
  {
    credentials: true,
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
    optionsSuccessStatus: 200,
  }
));
// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to WDS application." });
// });

// routes
require("./src/api/routes/order.routes")(app);
require("./src/api/routes/cart.routes")(app);
require("./src/api/routes/auth.routes")(app);
require("./src/api/routes/user.routes")(app);
require("./src/api/routes/product.routes")(app);
require("./src/api/routes/order.routes")(app);
require("./src/api/routes/cart.routes")(app);
//set port
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
