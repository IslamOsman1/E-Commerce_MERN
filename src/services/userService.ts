import userModel from "../models/userModel";
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken';

interface RedisterParams {
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}

export const register = async ({firstName,lastName,email,password}:RedisterParams)=>{
    const findUser = await userModel.findOne({email})
    if(findUser){
        return {data:"USER ALREADY EXISTS!",statusCode:400}
    }
    const hashedPassword =await bcrypt.hash(password,10)
    const newUser =new userModel({firstName,lastName,email,password : hashedPassword})
    await newUser.save()
    return {data:generateJWT({firstName,lastName,email}),statusCode:200};

}

interface LoginParams{
    email:string;
    password:string;
}

export const login = async ({email,password}:LoginParams)=>{
    const findUser =await userModel.findOne({email})
    if(!findUser){
        return {data:"a7a enta g2y tehzar",statusCode:400}
    } 
    const passwordMatch =await bcrypt.compare(password,findUser.password);
    if(passwordMatch){
        return {data:generateJWT({email,firstName:findUser.firstName,lastName:findUser.lastName}),statusCode:200};
    }

    return {data:"a7a enta g2y tehzar",statusCode:400}


}

const generateJWT = (data:any)=>{
    return JWT.sign(data,'ys7sOKxo40vBbc0HTEfLVSz4RZS4RA6g',{expiresIn:'24h'})
}