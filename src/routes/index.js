const router = require("express").Router();
const faker = require("faker");

const Product = require("../models/product");
//ROUTES
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/addProduct", (req, res) => {
  res.render("products/addProduct");
});

router.post("/addProduct", (req, res) => {
  console.log(req.body);
  // res.send('ruta post recibida');
  const product = new Product();
  product.category = req.body.category_name;
  product.name = req.body.product_name;
  product.price = req.body.product_price;
  product.cover = faker.image.image();
  product.save(err => {
    if (err) return next(err);
    res.redirect("/addProduct");
  });
});

router.get("/products/:page", (req, res, next) => {
  let perPage = 9;
  let page = req.params.page || 1;
  Product.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.countDocuments((err, count) => {
        if (err) return next(err);
        res.render("products/products", {
          products,
          current: page,
          pages: Math.ceil(count / perPage)
        });
      });
    });
});

router.get("/generateFakeData", (req, res) => {
  for (let i = 0; i < 90; i++) {
    const product = new Product();
    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.cover = faker.image.image();
    // console.log(product);
    product.save(err => {
      if (err) {
        return next(err);
      }
    });
  }
  res.redirect("/addProduct");
});

module.exports = router;
