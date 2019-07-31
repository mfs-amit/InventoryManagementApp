const router = require("express").Router();
const userController = require("../api/controllers/users");
const productController = require("../api/controllers/products");
const distributorController = require("../api/controllers/distributors");

router.use("/users", userController);
router.use("/products", productController);
router.use("/distributors", distributorController);

module.exports = router;