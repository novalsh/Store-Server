const db = require("../models");
const Order = db.orders;

exports.findOrder = (req, res) => {
  const id = Number(req.params.id);

  Order.aggregate([
    {
      //membikin where bila di sql
      $match: {
        user_id: id,
      },
    },
    {
      //membuat join bila di sql
      $lookup: {
        from: "products",
        localField: "cart_items",
        foreignField: "code",
        as: "products",
      },
    },
  ])
    //then and catch
    .then((result) => {
        res.send(result);
        }
    )
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orders.",
        });
    })
};
