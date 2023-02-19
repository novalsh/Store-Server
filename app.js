const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const port = 8000 || process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/img',express.static(path.join(__dirname, './public/img')))

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
