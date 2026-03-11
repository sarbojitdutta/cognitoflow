import jwt from 'jsonwebtoken'

export const signToken = async (payload)=>{
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {expiresIn: '30d'}
    )
}

export const verifyToken = async (token)=>{
    return jwt.verify(
        token,
        process.env.JWT_SECRET
    )
}