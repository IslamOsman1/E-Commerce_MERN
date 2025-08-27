import { cartModel } from "../models/cartModel";
import productModel from "../models/productModel";

interface CreaetCartForUser{
    userId : string;
}


const creaetCartForUser= async({userId}:CreaetCartForUser)=>{
const cart =await cartModel.create({userId,totalAmount:0})
await cart.save();
return cart;
}

interface GetActiveCartForUser{
    userId:string;

}

export const getActiveCartForUser = async({userId}:GetActiveCartForUser)=>{

    let cart = await cartModel.findOne({userId,status:"active"})
    if(!cart){
        cart =await creaetCartForUser({userId})
    }
   return cart;
};
interface AddItemToCart{
    productId :any ;
    userId:string;
    quantity:number;
}

export const addItemToCart = async ({productId,quantity,userId}:AddItemToCart)=>{
      const cart =await getActiveCartForUser({userId});
      const existsInCart = cart.items.find((p) => p.product.toString() === productId);
      if(existsInCart){
        return {data :"item already exists in cart", statusCode:400};

      }

      const product =await productModel.findById(productId);

      if(!product){
        return {data:"Product not found",statusCode:400}
      }
      if(product.stock < quantity ){
        return {data :"low stock for item",statusCode:400}
      }
      
      cart.items.push({product:productId,unitPrice:product.price,quantity});

      cart.totalAmount += product.price * quantity;
      const updatedCart =await cart.save();

      return {data:updatedCart,statusCode:200}

}


    interface UpdateItemInCart{
    productId :any ;
    userId:string;
    quantity:number;
}


    export const updateItemInCart = async({productId,userId,quantity}:UpdateItemInCart)=>{
                const cart =await getActiveCartForUser({userId});
                      const existsInCart = cart.items.find((p) => p.product.toString() === productId);
        
                      if(!existsInCart){
                        return {data:"item dose not exists",statusCode:400}
                      }
                            const product =await productModel.findById(productId);

                      if(!product){
                         return {data:"Product not found",statusCode:400}
                        }       
                        
                       if(product.stock < quantity ){
                        return {data :"low stock for item",statusCode:400}
                     }      


                      //calculate total amouant
                      const otherCartItems =cart.items.filter((p)=>p.product.toString()!==productId); 
                      let total = otherCartItems.reduce((sum,product)=>{
                          sum += product.quantity * product.unitPrice;
                          return sum;
                      },0)

                      existsInCart.quantity=quantity;

                      total += existsInCart.quantity * existsInCart.unitPrice;
                      cart.totalAmount = total;
                      const updatedCart =await cart.save();
                            return {data:updatedCart,statusCode:200}

    }
