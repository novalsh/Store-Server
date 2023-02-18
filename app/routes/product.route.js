module.exports = (app) => {
    const products = require("../controllers/product.controller.js");
    const router = require("express").Router();

    router.get("/", products.findAll);

    app.use("/api/products", router);
}
