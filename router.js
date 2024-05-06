const { Router } = require("express");
const productsRouter = require("./modules/products/routes/products.routes");
const authRouter = require("./modules/auth/routes/auth.routes");

const router = Router();

router.use("/products", productsRouter);
router.use("/auth", authRouter);

module.exports = router;
