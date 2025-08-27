import { cartModel } from "../models/cartModel";

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
}
