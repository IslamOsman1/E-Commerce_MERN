import { NextFunction,Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import { ExtendRequest } from "../types/extendedRequest";


const validateJWT = (req:ExtendRequest,res:Response,next:NextFunction)=>{
    const authorizationHeader =req.get('authorization');
    if(!authorizationHeader){
         res.status(403).send("authorizationHeader was not provided");
         return;
    }
    const token = authorizationHeader.split(" ")[1];
    if(!token){
        res.status(403).send("Bearer token not found");
        return;
    }

    jwt.verify(token,"ys7sOKxo40vBbc0HTEfLVSz4RZS4RA6g", async (err,payload)=>{
        if(err){
            
            res.status(403).send("invalid token");
            return;
        }
        if(!payload){
            res.status(403).send("invalid token payload");
            return;
        }

        const userPayload =payload as {email:string;firstName:string;lastName:string;};

        const user = await userModel.findOne({email:userPayload.email});

        req.user = user;
        next();
    
    });
};

export default validateJWT;