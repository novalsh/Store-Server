const express = require("express");
const app = express();
const port = 8000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then((result) => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Cannot connect to database", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({
    message: "WELCOME TO STORE",
  });
});

require('./app/routes/product.route')(app);
require('./app/routes/order.route')(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
