const path = require("path");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const products = require("./data/Products");
// Resolved against this file, not the working directory, so `npm start` works
// from the repo root as well as from api/.
dotenv.config({ path: path.join(__dirname, ".env") });
const PORT = process.env.PORT;
const cors = require("cors")
const mongoose = require("mongoose");


//connect db
mongoose
  .connect(process.env.MONGOOSEDB_RUL)
  .then(() => console.log("db connected"))
  .then((err) => {
    err;
  });

const databaseSeeder = require("./databaseSeeder");
const userRoute = require("./routes/User");
const productRoute = require("./routes/Product");
const orderRoute = require("./routes/Order");

app.use(express.json())

app.use(cors())

//database seeder routes
app.use("/api/seed", databaseSeeder);

//routes for users
app.use("/api/users", userRoute);

//routes for products
app.use("/api/products", productRoute);

//routes for orders
app.use("/api/orders", orderRoute);





// paypal payment api for client key;
app.use("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});





// Serve the built client. Registered after the API routes so /api/* still wins,
// with a fallback to index.html so client-side routes survive a refresh.
const clientDist = path.join(__dirname, "..", "client", "dist");
app.use(express.static(clientDist));
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

app.listen(PORT || 9000, () => {
  console.log(`server listening on port ${PORT || 9000}`);
});
















//api product test route
// app.get("/api/products", (req, res) => {
//   res.json(products);
// });
// app.get("/api/products/:id", (req, res) => {
//     const product = products.find((product)=>product.id === req.params.id)
//     res.json(product);
//   });