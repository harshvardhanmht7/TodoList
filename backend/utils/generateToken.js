import jwt from 'jsonwebtoken';

export const generateToken=(id)=>{

    const jwtTokenKey=process.env.JWT_SECRET

    const token = jwt.sign({id}, jwtTokenKey);
    return token

}