import productModel from "../models/productModel";



export const getAllProducts = async () => {
    
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  const products = [
    { title: "Dell laptop", image: "E:\full stack\e-commerce\src\images\laptop.jpg", price: 20000, stock: 45 },
  
  ];

  const existingProducts = await getAllProducts();

  if (existingProducts.length === 0) {
    await productModel.insertMany(products);
  }
};

