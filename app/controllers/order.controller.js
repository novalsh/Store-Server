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
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

exports.addToCart = (req, res) => {
  const id = Number(req.params.id);
  const productCode = String(req.body.product);

  Order.updateOne(
    {
      user_id: id,
    },
    {
      //fungsi dari add to set sebuah metode dalam MongoDB yang digunakan untuk menambahkan elemen ke dalam sebuah array di dalam dokumen koleksi MongoDB, namun hanya jika elemen tersebut belum ada dalam array tersebut. Jika elemen yang ditambahkan sudah ada dalam array, maka operasi akan diabaikan.
      $addToSet: {
        cart_items: productCode,
      },
    }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

exports.removeFromCart = (req, res) => {
  const id = Number(req.params.id);
  const productCode = String(req.params.product);

  Order.updateOne(
    {
      user_id: id,
    },
    {
      //mengambil data dari array yang ada di cart_items
      $pull: {
        cart_items: productCode,
      },
    }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

exports.checkout = (req, res) => {
  const id = Number(req.params.id);
  const productCode = String(req.body.product);
  const totalPrice = Number(req.body.productPrice);

  Order.updateOne(
    {
      user_id: id,
    },
    {
      $set: {
        cart_items: productCode,
        total_price: totalPrice,
      },
    }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    })
};

