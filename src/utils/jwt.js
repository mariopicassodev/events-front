import jwt from "jsonwebtoken"
import {decode} from 'next-auth/jwt'


export async function getTokenData(token) {
    try {
        const data = await decode({token: token, secret: process.env.NEXTAUTH_SECRET});
        return data;
    } catch (error) {
        console.log("error decoding token: \n" + error);
        return null;
    }
}


export function buildJWT(payload) {
    const secret = process.env.NEXTAUTH_SECRET;
    try {
        const token = jwt.sign(payload, secret);
        return token;
    } catch (error) {
        console.log("error building token: \n" + error);
        return null;
    }
}

export async function fromJWEtoJWT(JWEtoken){
    const payload = await getTokenData(JWEtoken);
    const JWTtoken = buildJWT(payload);
    return JWTtoken;
}
