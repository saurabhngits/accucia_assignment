const express = require("express");
const app = express();

const port = process.env.PORT || 8000;
const productCategoryMasterRouter = require('./routers/productCategoryMaster');
const productDetailsRouter = require('./routers/productDetails');

app.use(express.json());
app.use(productCategoryMasterRouter);
app.use(productDetailsRouter);

app.listen(port, () => {
    console.log(`Server is listing at port ${port}`);
})