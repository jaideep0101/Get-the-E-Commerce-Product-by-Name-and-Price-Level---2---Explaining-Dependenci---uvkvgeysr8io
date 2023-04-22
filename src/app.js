const fs = require("fs");
const express = require("express");
const app = express();

// Importing products from products.json file
const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`));

//Middlewares
app.use(express.json());

// GET endpoint for sending the products to client by id
//// Endpoint - /api/v1/products/:id
app.get("/api/v1/products/:id",(req,res)=>{
const id = (req.params.id);
  const product = products.find(p => p.id);
  
  if(product){
  res.status(200).json({
  "status": "success",
  "message": "Product fetched successfully",
    "data": {
    "products": {
    "id": product.id,
      "name": product.name,
      "price": product.price,
      "quantity": product.quantity
    }}
  });
  }else{
    res.status(404).json({
    "status": "failed",
    "message": "Product not faound!"
    })
  }
})

module.exports = app;
